export interface Client {
  id: string;
  tipoDocumento: 'DNI' | 'RUC' | 'CE';
  numeroDocumento: string;
  nombres: string;
  apellidos: string;
  razonSocial: string;
  email: string;
  telefono: string;
  direccion: string;
  consentimientoDatos: boolean;
  fechaConsentimiento: string | null;
  activo: boolean;
  createAt?: string;
  updateAt?: string;
}
