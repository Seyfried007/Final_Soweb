import { Component, HostListener, Inject, PLATFORM_ID  } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.css'
})
export class ComprasComponent {
sidebarOpen=false;
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
}
