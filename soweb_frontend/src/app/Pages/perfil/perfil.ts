import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css'],
})

export class Perfil {
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
   imagenUrl: string = 'https://randomuser.me/api/portraits/men/32.jpg';

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.imagenUrl = reader.result as string;
      reader.readAsDataURL(file);
    }
  
}
}