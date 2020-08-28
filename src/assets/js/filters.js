import Vue from 'vue';

Vue.filter('money', (num = 0) => {
  const parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `$${parts.join('.')}`;
});

Vue.filter('lowerCase', (str) => str.toLowerCase());
