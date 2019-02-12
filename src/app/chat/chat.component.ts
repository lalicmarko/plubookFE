import { Component, OnInit } from '@angular/core';
import {Stomp} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {FormControl} from '@angular/forms';
import $ from 'jquery';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  private stompClient;
  private selectedChat;

  greetings: string[] = [];
  contacts: string[] = [];

  tabs = ['First', 'Second', 'Third'];
  selected = new FormControl(0);

  addTab(selectAfterAdding: boolean) {
    this.tabs.push('New');

    if (selectAfterAdding) {
      this.selected.setValue(this.tabs.length - 1);
    }
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

  constructor() {
    this.connect();
    $(function() {

      /* Get all rows from your 'table' but not the first one
       * that includes headers. */
      const rows = $('tr').not(':first');

      /* Create 'click' event handler for rows */
      rows.on('click', function(e) {

        /* Get current row */
        const row = $(this);

        /* Check if 'Ctrl', 'cmd' or 'Shift' keyboard key was pressed
         * 'Ctrl' => is represented by 'e.ctrlKey' or 'e.metaKey'
         * 'Shift' => is represented by 'e.shiftKey' */
        if ((e.ctrlKey || e.metaKey) || e.shiftKey) {
          /* If pressed highlight the other row that was clicked */
          row.addClass('highlight');
        } else {
          /* Otherwise just highlight one row and clean others */
          rows.removeClass('highlight');
          row.addClass('highlight');
        }

      });

      /* This 'event' is used just to avoid that the table text
       * gets selected (just for styling).
       * For example, when pressing 'Shift' keyboard key and clicking
       * (without this 'event') the text of the 'table' will be selected.
       * You can remove it if you want, I just tested this in
       * Chrome v30.0.1599.69 */
      $(document).bind('selectstart dragstart', function(e) {
        e.preventDefault(); return false;
      });

    });
  }

  connect() {
    const ws = new SockJS('http://localhost:8080/endpoint');
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({},  () => {
      that.stompClient.subscribe('/chat', message => {
        if (message.body) {
          console.log(message.body);
          this.pushMessage(message.body);
          $('.chat').append('<div class=\'alert alert-secondary flex-wrap\'>' + message.body + '</div>');
        }
      });
    });
  }

  sendMessage(message) {
    if (message) {
      this.stompClient.send('/app/send/message', {}, message);
    }
    $('#input').val('');
  }

  pushMessage(message) {
    this.greetings.push(message);
  }

  ngOnInit(): void {
    this.contacts = ['Marko', 'Darko', 'Honolulu', 'Parmezan'];
  }

  selectContact(contact) {
    if (contact) {
      console.log(contact);
      this.selectedChat = contact;
    }
  }

}
