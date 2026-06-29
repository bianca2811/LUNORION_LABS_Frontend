/*import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `<router-outlet />`,
  styles: ``,
})
export class App {}
*/


// Prueba de FilterPanel
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// 💡 Importamos tu componente dinámico real desde la carpeta de compartidos
import { FilterPanelComponent } from './shared/components/filter-panel/filter-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FilterPanelComponent], // 💡 Agregado aquí
  template: `
    <!-- Fondo gris suave para resaltar el sombreado del panel blanco -->
    <div style="padding: 40px; background-color: #f0f2f5; min-height: 100vh; display: flex; flex-direction: column; gap: 20px; justify-content: center; align-items: center;">
      
      <h2 style="color: #333333; font-family: Arial, sans-serif; margin-bottom: 5px;">🧪 Área de Pruebas: Calendario Real Dinámico</h2>
      
      <!-- 🧪 Renderizamos tu componente Filter Panel -->
      <app-filter-panel
        (onApply)="alAplicarFiltro($event)"
        (onCancel)="alCancelarFiltro()">
      </app-filter-panel>

    </div>

    <!-- Conservamos el enrutador intacto abajo -->
    <router-outlet />
  `,
})
export class App {
  
  // Captura el rango final de fechas cuando el usuario presiona "Apply"
  alAplicarFiltro(event: { startDate: string; endDate: string }) {
    console.log('Filtro de fechas confirmado por el usuario:', event);
    alert(`¡Filtro Aplicado con Éxito!\n\nDesde: ${event.startDate}\nHasta: ${event.endDate}`);
  }

  // Captura el clic cuando el usuario presiona "Cancel"
  alCancelarFiltro() {
    console.log('El usuario canceló la selección del rango de fechas.');
    alert('Acción cancelada.');
  }
}


/*
// KpiCard
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// 💡 Ruta corregida apuntando a 'components' igual que los demás archivos
import { KpiCardComponent } from '../shared/components/kpi-card/kpi-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, KpiCardComponent], // Ahora sí reconocerá el componente de forma estática
  template: `
    <div style="padding: 40px; background-color: #f5f2eb; min-height: 100vh; display: flex; gap: 20px; justify-content: center; align-items: center;">
      
      <!-- 🧪 Probando tu componente KPI Card -->
      <app-kpi-card
        title="Orders MTD (€)"
        mainValue="518M"
        compareLabel="MTD LY"
        compareValue="483M"
        gapValue="35.4M"
        gapPercentage="7.3%"
        [isPositiveGap]="true"
        [trendData]="[400, 420, 410, 450, 480, 460, 500, 518]">
      </app-kpi-card>

    </div>

    <router-outlet />
  `,
})
export class App {}
/*

/*
// Prueba de EmptyStateComponent
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// 💡 Importamos tu nuevo componente adaptado a la captura
import { EmptyStateComponent } from '../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EmptyStateComponent], // 💡 Agregado aquí
  template: `
    <!-- Fondo blanco para que combine perfectamente con tu captura de pantalla -->
    <div style="padding: 40px; background-color: #ffffff; min-height: 100vh; display: flex; justify-content: center; align-items: center;">
      
      <!-- 🧪 Probando tu componente Empty State Replicado -->
      <app-empty-state
        title="No results found"
        description="Try adjusting your search or filter to find what you're looking for."
        (onHelpClick)="alHacerClicEnSoporte($event)">
      </app-empty-state>

    </div>

    <router-outlet />
  `,
})
export class App {
  alHacerClicEnSoporte(tipo: string) {
    console.log('El usuario hizo clic en el enlace de ayuda:', tipo);
    alert(`Redireccionando a la sección de: ${tipo}`);
  }
}
*/

/*
// Prueba de StatusBadge
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// 💡 Importamos el componente de la carpeta shared que creaste
import { StatusBadgeComponent } from '../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StatusBadgeComponent], // 💡 Agregamos StatusBadgeComponent aquí
  template: `
    <div style="padding: 40px; display: flex; flex-direction: column; gap: 16px; background-color: #ffffff; min-height: 100vh;">
      <h2 style="color: #334155; font-family: sans-serif; margin-bottom: 10px;">🧪 Área de Pruebas: Status Badge / Chips</h2>
      
      <!-- Variante Verde: Connected -->
      <app-status-badge status="connected"></app-status-badge>
      
      <!-- Variante Gris/Carga: Importing -->
      <app-status-badge status="importing"></app-status-badge>
      
      <!-- Variante Gris Atenuado: Disabled -->
      <app-status-badge status="disabled"></app-status-badge>
      
      <!-- Variante Roja: Needs Attention -->
      <app-status-badge status="attention"></app-status-badge>

    </div>

    <!-- Conservamos el enrutador intacto abajo -->
    <router-outlet />
  `,
})
export class App {}
*/

/*
//Prueba de PageHeader
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageHeaderComponent } from '../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PageHeaderComponent],
  template: `
    <div style="padding: 24px; background-color: #0b0f19; min-height: 100vh;">
      
      <!-- 🧪 Componente Page Header con etiquetas perfectamente cerradas -->
      <app-page-header
        title="Pacientes"
        buttonText="Nuevo paciente"
        searchPlaceholder="Buscar paciente..."
        (onSearch)="alBuscarPaciente($event)"
        (onActionClick)="alCrearNuevoPaciente()">
      </app-page-header>

    </div>

    <router-outlet />
  `,
})
export class App {
  alBuscarPaciente(texto: string) {
    console.log('Filtrando lista de pacientes por:', texto);
  }

  alCrearNuevoPaciente() {
    console.log('Se hizo clic en el botón para registrar un nuevo paciente.');
    alert('¡Botón funcionando correctamente!');
  }
}
*/

/*
//Prueba de FormField
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// 💡 Importamos tu componente aquí
import { FormFieldComponent } from '../shared/components/form-field/form-field.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormFieldComponent], // 💡 Agregamos FormFieldComponent aquí
  template: `
    <div style="padding: 40px; background-color: #1e1e1e; color: white;">
      <h2>🧪  Pruebas de tu Form Field</h2>
      
      <app-form-field label="Nombre de Usuario">
        <input type="text" #formInput placeholder="Escribe aquí...">
      </app-form-field>

      <app-form-field label="Contraseña" [hasError]="true" errorMessage="Contraseña incorrecta">
        <input type="password" #formInput placeholder="••••••••">
      </app-form-field>
    </div>

    <!-- 💡 Conservamos el router-outlet intacto abajo -->
    <router-outlet />
  `,
})
export class App {}
*/