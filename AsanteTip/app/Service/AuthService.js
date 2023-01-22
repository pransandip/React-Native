import HttpClient from '@Utils/HttpClient';
import Storage from '@Utils/Storage';

// Authentication

const getAccount = async () => {
  return await Storage.get('account');
};

const setAccount = async data => {
  return await Storage.set('account', data);
};

const logout = async () => {
  await Storage.clear();
};

// Common

const forgotPass = async data => {
  let endpoint = 'bussiness_user_passwordreset.php';
  return HttpClient.post(endpoint, data);
};

const searchTransaction = async data => {
  let endpoint = 'search.php';
  return HttpClient.post(endpoint, data);
};

const singlePay = async data => {
  let endpoint = 'singlePay.php';
  return HttpClient.post(endpoint, data);
};

const multiplePay = async data => {
  let endpoint = 'multiple_pay.php';
  return HttpClient.post(endpoint, data);
};

const deleteBankAccount = async data => {
  let endpoint = 'delete_bank.php';
  return HttpClient.post(endpoint, data);
};

const termsAndConditions = async () => {
  let endpoint = 'trm_condition.php';
  return HttpClient.get(endpoint);
};

const addCard = async data => {
  let endpoint = 'credit_card.php';
  return HttpClient.post(endpoint, data);
};

const deleteCard = async data => {
  let endpoint = 'delete_credit_card.php';
  return HttpClient.post(endpoint, data);
};

// For Customer

const register = async data => {
  let endpoint = 'user_api/register.php';
  return HttpClient.post(endpoint, data);
};

const login = async data => {
  let endpoint = 'user_api/login.php';
  return HttpClient.post(endpoint, data);
};

const profileUser = async data => {
  let endpoint = 'user_api/profile_fetch.php';
  return HttpClient.post(endpoint, data);
};

const updateUser = async data => {
  let endpoint = 'user_api/update_profile.php';
  return HttpClient.post(endpoint, data);
};

const fetchUserAddress = async data => {
  let endpoint = 'user_api/fetch_address.php';
  return HttpClient.post(endpoint, data);
};

const addUserAddress = async data => {
  let endpoint = 'user_api/address.php';
  return HttpClient.post(endpoint, data);
};

const deleteUserAddress = async data => {
  let endpoint = 'user_api/deleteadd.php';
  return HttpClient.post(endpoint, data);
};

const personalInfo = async data => {
  let endpoint = 'user_api/user_personalInformation.php';
  return HttpClient.post(endpoint, data);
};

const singleTip = async data => {
  let endpoint = 'user_api/add_wallet_blance.php';
  return HttpClient.post(endpoint, data);
};

const userTransactionHistory = async data => {
  let endpoint = 'user_api/trunsection_history.php';
  return HttpClient.post(endpoint, data);
};

const addUserWalletBalance = async data => {
  let endpoint = 'user_api/add_wallet_blance.php';
  return HttpClient.post(endpoint, data);
};

const addUserBankAccounts = async data => {
  let endpoint = 'user_api/add_bank.php';
  return HttpClient.post(endpoint, data);
};

const userBankAccounts = async data => {
  let endpoint = 'user_api/fetch_account.php';
  return HttpClient.post(endpoint, data);
};

const userWithdrawBalance = async data => {
  let endpoint = 'user_api/wallet_to_bank.php';
  return HttpClient.post(endpoint, data);
};

const userFetchCards = async data => {
  let endpoint = 'user_api/fetch_credit_card.php';
  return HttpClient.post(endpoint, data);
};

// For Employees

const businessRegister = async data => {
  let endpoint = 'bussiness/register.php';
  return HttpClient.post(endpoint, data);
};

const businessLogin = async data => {
  let endpoint = 'bussiness/login.php';
  return HttpClient.post(endpoint, data);
};

const profileFetch = async data => {
  let endpoint = 'bussiness/profile_fetch.php';
  return HttpClient.post(endpoint, data);
};

const updateProfile = async data => {
  let endpoint = 'bussiness/update_profile.php';
  return HttpClient.post(endpoint, data);
};

const employeeFetch = async data => {
  let endpoint = 'bussiness/fetch_employee.php';
  return HttpClient.post(endpoint, data);
};

const employeeRegister = async data => {
  let endpoint = 'bussiness/employee_register.php';
  return HttpClient.post(endpoint, data);
};

const fetchEmployeeAddress = async data => {
  let endpoint = 'bussiness/fetch_address.php';
  return HttpClient.post(endpoint, data);
};

const addEmployeeAddress = async data => {
  let endpoint = 'bussiness/address.php';
  return HttpClient.post(endpoint, data);
};

const deleteEmployeeAddress = async data => {
  let endpoint = 'bussiness/delete_add.php';
  return HttpClient.post(endpoint, data);
};

const businessInfo = async data => {
  let endpoint = 'bussiness/bussiness_personalInformation.php';
  return HttpClient.post(endpoint, data);
};

const businessSingleTip = async data => {
  let endpoint = 'bussiness/add_wallet_balance.php';
  return HttpClient.post(endpoint, data);
};

const businessTransactionHistory = async data => {
  let endpoint = 'bussiness/transection_history.php';
  return HttpClient.post(endpoint, data);
};

const addBusinessWalletBalance = async data => {
  let endpoint = 'bussiness/add_wallet_balance.php';
  return HttpClient.post(endpoint, data);
};

const businessBankAccounts = async data => {
  let endpoint = 'bussiness/fetch_bank.php';
  return HttpClient.post(endpoint, data);
};

const addBusinessBankAccounts = async data => {
  let endpoint = 'bussiness/add_bank.php';
  return HttpClient.post(endpoint, data);
};

const deleteEmployees = async data => {
  let endpoint = 'bussiness/edit_employee.php';
  return HttpClient.post(endpoint, data);
};

const businessFetchCards = async data => {
  let endpoint = 'bussiness/fetch_credit_card.php';
  return HttpClient.post(endpoint, data);
};

export default {
  register,
  login,
  logout,
  businessRegister,
  businessLogin,
  getAccount,
  setAccount,
  profileFetch,
  updateProfile,
  employeeFetch,
  profileUser,
  updateUser,
  employeeRegister,
  fetchUserAddress,
  addUserAddress,
  fetchEmployeeAddress,
  addEmployeeAddress,
  deleteUserAddress,
  deleteEmployeeAddress,
  personalInfo,
  businessInfo,
  forgotPass,
  singleTip,
  businessSingleTip,
  searchTransaction,
  singlePay,
  multiplePay,
  userTransactionHistory,
  businessTransactionHistory,
  addUserWalletBalance,
  addBusinessWalletBalance,
  userBankAccounts,
  addUserBankAccounts,
  businessBankAccounts,
  addBusinessBankAccounts,
  deleteBankAccount,
  userWithdrawBalance,
  deleteEmployees,
  termsAndConditions,
  addCard,
  userFetchCards,
  businessFetchCards,
  deleteCard,
};
