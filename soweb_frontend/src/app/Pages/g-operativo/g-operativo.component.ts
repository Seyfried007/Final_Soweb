import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-g-operativo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './g-operativo.component.html',
  styleUrls: ['./g-operativo.component.css'],
})
export class GOperativoComponent {
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

  openPanel2() {
    window.open('http://localhost:5173', '_blank');
  }
}
