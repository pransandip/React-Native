import HttpClient from '@Utils/HttpClient';

const updateSales = async data => {
  let endpoint = 'sales.php';
  return HttpClient.post(endpoint, data);
};

const uploadExpenseImage = async data => {
  let endpoint = 'expense_img.php';
  return HttpClient.upload(endpoint, 'POST', data);
};

const updateExpense = async data => {
  let endpoint = 'expense.php';
  return HttpClient.post(endpoint, data);
};

const fetchProfit = async data => {
  let endpoint = 'profit.php';
  return HttpClient.post(endpoint, data);
};

const paymentTerms = async () => {
  let endpoint = 'payment_terms.php';
  return HttpClient.post(endpoint);
};

const customerDetails = async data => {
  let endpoint = 'customer_details.php';
  return HttpClient.post(endpoint, data);
};

const editProfileDetails = async data => {
  let endpoint = 'business_profile_edit.php';
  return HttpClient.post(endpoint, data);
};

export default {
  updateSales,
  uploadExpenseImage,
  updateExpense,
  fetchProfit,
  paymentTerms,
  customerDetails,
  editProfileDetails,
};
