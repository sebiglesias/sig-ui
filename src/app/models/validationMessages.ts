export const validationMessages = {
  'productName': [
    { type: 'required', message: 'El nombre es requerido' },
    { type: 'minlength', message: 'El nombre del producto debe tener un minimo de 3 caracteres' },
    { type: 'maxlength', message: 'El nombre del producto puede tener un maximo de 20 caracteres' }
  ],
  'productType': [
    { type: 'required', message: 'Email is required' },
    { type: 'minlength', message: 'El tipo del producto debe tener un minimo de 4 caracteres' }
  ]
};
