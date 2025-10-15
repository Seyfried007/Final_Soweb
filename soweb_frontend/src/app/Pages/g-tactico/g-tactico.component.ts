// g-tactico.component.ts (completo con gráficos, tablas y textos)
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import {
  ChartConfiguration,
  ChartOptions
} from 'chart.js';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-g-tactico',
  standalone: true,
  imports: [CommonModule, NgChartsModule, RouterModule],
  templateUrl: './g-tactico.component.html',
  styleUrls: ['./g-tactico.component.css'],
})
export class GTacticoComponent {
  sidebarOpen = false;
  profileMenuOpen = false;
  isBrowser = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebarOnMobile(): void {
    if (window.innerWidth <= 768 && this.sidebarOpen) {
      this.sidebarOpen = false;
    }
  }

  toggleProfileMenu(): void {
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  onVolver(): void {
    this.profileMenuOpen = false;
  }

  onConfiguracion(): void {
    this.profileMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    this.profileMenuOpen = false;
  }

  lineChartType: 'line' = 'line';
  barChartType: 'bar' = 'bar';
  pieChartType: 'pie' = 'pie';
  donutChartType: 'doughnut' = 'doughnut';

  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jul 2024', 'Ago 2024', 'Sep 2024', 'Oct 2024', 'Nov 2024', 'Dic 2024', 'Ene 2025', 'Feb 2025', 'Mar 2025', 'Abr 2025', 'May 2025', 'Jun 2025', 'Jul 2025'],
    datasets: [
      {
        data: [20, 15, 14, 10, 13, 9, 11, 17, 23, 16, 18, 12, 5],
        label: 'Ventas Mensuales',
        fill: false,
        tension: 0.3,
        borderColor: '#0d6efd',
        backgroundColor: '#0d6efd',
        pointRadius: 5,
        pointHoverRadius: 7,
        borderWidth: 2,
      }
    ]
  };

  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 30,
        ticks: { stepSize: 5 }
      }
    }
  };

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Jul-Sep 2024', 'Oct-Dic 2024', 'Ene-Mar 2025', 'Abr-Jun 2025', 'Jul-Sep 2025'],
    datasets: [
      {
        label: 'Ventas Trimestrales',
        data: [49, 32, 51, 47, 5],
        backgroundColor: '#198754'
      }
    ]
  };

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 10 }
      }
    }
  };

  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['2024', '2025'],
    datasets: [
      {
        data: [151, 102],
        backgroundColor: ['#fd7e14', '#0dcaf0']
      }
    ]
  };

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 20,
          padding: 15
        }
      }
    }
  };

  donutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Producto A', 'Producto B', 'Producto C'],
    datasets: [
      {
        data: [35, 25, 40],
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56']
      }
    ]
  };

  donutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 15,
          padding: 10
        }
      }
    }
  };

  marketShare = 58;
}
