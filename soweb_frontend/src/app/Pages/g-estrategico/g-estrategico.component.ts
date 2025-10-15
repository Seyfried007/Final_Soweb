import { Component, Inject, PLATFORM_ID, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-g-estrategico',
  standalone: true,
  imports: [CommonModule, NgChartsModule, RouterModule],
  templateUrl: './g-estrategico.component.html',
  styleUrls: ['./g-estrategico.component.css'],
})
export class GEstrategicoComponent implements AfterViewInit {
  // Controlador para verificar si estamos en el navegador
  isBrowser: boolean = false;

  // Datos de los gráficos
  salesData: ChartConfiguration['data'] = {
    labels: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06', '2024-07'],
    datasets: [
      {
        label: 'Ventas Reales',
        data: [15, 10, 18, 22, 13, 17, 19],
        borderColor: '#1e90ff',
        fill: false,
        tension: 0.4,
        pointRadius: 5,
      },
      {
        label: 'Ventas Proyectadas',
        data: [16, 14, 19, 20, 15, 18, 21],
        borderColor: '#ff7f50',
        fill: false,
        tension: 0.4,
        pointRadius: 5,
      },
    ],
  };

  salesOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Fecha',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Ventas en Miles',
        },
      },
    },
  };

  // Datos para los gráficos de pedidos
  onTimeOrdersData: ChartConfiguration['data'] = {
  labels: ['Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  datasets: [
    {
      data: [10.9, 8.2, 7.7, 5.5, 7.1, 9.4],
      backgroundColor: [
        '#ffb6c1', '#ffa07a', '#f0e68c', '#90ee90', '#ff6347', '#ff4500',
      ],
      hoverOffset: 4,
    },
  ],
};

  delayedOrdersData: ChartConfiguration['data'] = {
    labels: ['Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        data: [12.8, 7.7, 10.3, 7.1, 10.3, 12.8],
        backgroundColor: [
          '#f0e68c',
          '#ff6347',
          '#ff7f50',
          '#7fff00',
          '#ff4500',
          '#d2691e',
        ],
        hoverOffset: 4,
      },
    ],
  };

  pendingOrdersData: ChartConfiguration['data'] = {
    labels: ['Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        data: [5.0, 10.0, 5.0, 10.0, 10.0, 5.0],
        backgroundColor: [
          '#ff6347',
          '#f0e68c',
          '#90ee90',
          '#ff4500',
          '#ff7f50',
          '#d2691e',
        ],
        hoverOffset: 4,
      },
    ],
  };

  pieOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  quarterlySalesData: ChartConfiguration['data'] = {
    labels: ['Jul-Sep 2024', 'Oct-Dic 2024', 'Ene-Mar 2025', 'Abr-Jun 2025'],
    datasets: [
      {
        label: 'Ventas Trimestrales',
        data: [50, 40, 55, 30],
        backgroundColor: '#4caf50',
        hoverOffset: 4,
      },
    ],
  };

  quarterlySalesOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  annualSalesData: ChartConfiguration['data'] = {
    labels: ['2024', '2025'],
    datasets: [
      {
        label: 'Ventas Anuales',
        data: [100, 120],
        borderColor: '#ff9800',
        fill: false,
        tension: 0.4,
        pointRadius: 5,
      },
    ],
  };

  productSalesData: ChartConfiguration['data'] = {
    labels: ['Producto A', 'Producto B', 'Producto C'],
    datasets: [
      {
        data: [30, 40, 30],
        backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe'],
        hoverOffset: 4,
      },
    ],
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    // Verifica si estamos en el navegador, no en el servidor
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;  // Marca que estamos en el navegador
    }
  }

  // Métodos para la barra lateral y el menú de perfil
  sidebarOpen = false;
  profileMenuOpen = false;

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
}
