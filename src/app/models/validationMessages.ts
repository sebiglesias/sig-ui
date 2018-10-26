export const validationMessages = {
  'standardName': [
    { type: 'required', message: 'El nombre es requerido' },
    { type: 'minlength', message: 'El nombre debe tener un minimo de 3 caracteres' },
    { type: 'maxlength', message: 'El nombre puede tener un maximo de 20 caracteres' }
  ],
  'productType': [
    { type: 'required', message: 'Email is required' },
    { type: 'minlength', message: 'El tipo del producto debe tener un minimo de 4 caracteres' },
    { type: 'maxlength', message: 'El tipo del producto puede tener un maximo de 20 caracteres' }
  ],
  containerId: [
    { type: 'required', message: 'El identificador del contenedor es requerido' }
  ],
  standard: [
    { type: 'required', message: 'Este campo es requerido' }
  ],
  standardText: [
    { type: 'required', message: 'Este campo es requerido' },
    { type: 'minlength', message: 'Debe tener un minimo de 3 caracteres' },
    { type: 'maxlength', message: 'Debe tener un maximo de 20 caracteres' },
  ]
};
