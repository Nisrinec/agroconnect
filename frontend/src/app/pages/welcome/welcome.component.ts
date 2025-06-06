import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-welcome',
  template: `
    <h2>Welcome, {{ username }}!</h2>
  `,
  imports: [CommonModule],
})
export class WelcomeComponent {
  username = '';

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.username = params['user'];
    });
  }
}
