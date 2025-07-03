const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';
let formData = { 
  email: '',
  message: '', 
};
const savedData = localStorage.getItem(STORAGE_KEY);// отримання даних з localStorage при старті
if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);
    formData = { ...formData, ...parsedData };

    if (parsedData.email) {
      form.elements.email.value = parsedData.email;
    }

    if (parsedData.message) {
      form.elements.message.value = parsedData.message;
    }
  } catch (error) {
    console.error('Помилка при парсингу даних з localStorage:', error);
  }
}
form.addEventListener('input', (e) => {
  if (e.target.name === 'email' || e.target.name === 'message') {
    formData[e.target.name] = e.target.value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
}); // зберігання даних в localStorage при введенні

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  } //обробка події submit

  console.log('Form submitted with data:', formData);

  localStorage.removeItem(STORAGE_KEY);// очищення
  form.reset();
  formData = { email: '', message: '' };
});
