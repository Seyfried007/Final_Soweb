import { Routes } from '@angular/router';
import { GTacticoComponent } from './Pages/g-tactico/g-tactico.component';
import { LoginComponent } from './Pages/login/login.component';
import { NosotrosComponent } from './Pages/nosotros/nosotros.component';
import { IniciarComponent } from './Pages/iniciar/iniciar.component';
import { NoticiasComponent } from './Pages/noticias/noticias.component';
import { OlvidasteContrasenaComponent } from './Pages/olvidaste-contrasena/olvidaste-contrasena.component';
import { CatalogoComponent } from './Pages/catalogo/catalogo.component';
import { SoporteComponent } from './Pages/soporte/soporte.component';
import { RegistrarComponent } from './Pages/registrar/registrar.component';
import { ComprarComponent } from './Pages/comprar/comprar.component';
import { TarjetaComponent } from './Pages/tarjeta/tarjeta.component';
import { GEstrategicoComponent } from './Pages/g-estrategico/g-estrategico.component';
import { GOperativoComponent } from './Pages/g-operativo/g-operativo.component';
import { NoticiaDetalleComponent } from './Pages/noticia-detalle/noticia-detalle.component';
import { ReciboComponent } from './Pages/Recibo/recibo/recibo.component';
import { NotificacionesComponent } from './Pages/Notificaciones/notificaciones/notificaciones.component';
import { ComprasComponent } from './Pages/compras/compras.component';
import { Perfil } from './Pages/perfil/perfil';

export const routes: Routes = [
    {path:'', component:IniciarComponent},
    {path:'inicio',component:IniciarComponent},
    {path:'nosotros',component:NosotrosComponent},
    {path:'login', component:LoginComponent},
    {path:'olvide-contrasena', component:OlvidasteContrasenaComponent},
    {path:'noticia',component:NoticiasComponent},
    {path:'catalogo', component:CatalogoComponent},
    {path:'soporte', component:SoporteComponent},
    {path:'registrar',component:RegistrarComponent},
    {path:'gtactico',component:GTacticoComponent},
    {path:'comprar', component:ComprarComponent},
    {path:'tarjeta', component:TarjetaComponent},
    {path:'gestrategico', component:GEstrategicoComponent},
    {path:'goperativo', component:GOperativoComponent},
    {path:'noticiadetalle', component:NoticiaDetalleComponent},
    {path:'recibo', component:ReciboComponent},
    {path:'perfil', component:Perfil},
    {path:'notificaciones', component:NotificacionesComponent},
    {path:'compras', component:ComprasComponent},
];
