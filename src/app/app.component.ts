import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  messagesReport: any[] = [];
  clients: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.http
      .get(`http://localhost:3000/dev/api/clients`)
      .subscribe((clientRes: any) => {
        this.clients = clientRes.data;
      });

    this.route.queryParams.subscribe((params) => {
      if (params['month']) {
        this.fetchMessageReport(params['month'], params['clientId']);
      }
    });
  }

  onChangeMonth(event: any) {
    const month = event.target.value.split('-')[1];

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { month },
      queryParamsHandling: 'merge',
    });
  }

  onChangeClient(event: any) {
    const clientId = event.target.value;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { clientId },
      queryParamsHandling: 'merge',
    });
  }

  fetchMessageReport(month: number, clientId?: number) {
    this.http
      .get(
        `http://localhost:3000/dev/api/messages/report?month=${month}&clientId=${clientId}`
      )
      .subscribe((report: any) => {
        this.messagesReport = report.data;
      });
  }
}
