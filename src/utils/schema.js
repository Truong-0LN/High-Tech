import * as Yup from 'yup';
const requiredErrorMessage = 'Vui lòng điền đầy đủ thông tin';
const validPhoneMessage = 'Vui lòng điền đúng định dạng số điện thoại';
const validEmailMessage = 'Vui lòng điền đúng định dạng email';
const validPassMessage = 'Mật khẩu phải có tối thiểu sáu ký tự';
const confirmPassMessage = 'Mật khẩu không trùng khớp';
const validFullnameMessage = 'Vui lòng điền đúng định dạng tên';
const regexPass = /^.{6,}$/;
//Tối thiểu tám ký tự, ít nhất một chữ cái và một số:
const regexPhone =
  /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
//
const regexEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const regexFullname = /^[A-Za-z]/;

const validateLoginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(regexEmail, validEmailMessage)
    .required(requiredErrorMessage),
  password: Yup.string()
    .matches(regexPass, validPassMessage)
    .required(requiredErrorMessage),
});
const validateEmailSchema = Yup.object().shape({
  email: Yup.string()
    .required(requiredErrorMessage)
    .matches(regexEmail, validEmailMessage),
});
const validateRegisterSchema = Yup.object().shape({
  fullname: Yup.string()
    .matches(regexFullname, validFullnameMessage)
    .required(requiredErrorMessage),
  email: Yup.string()
    .matches(regexEmail, validEmailMessage)
    .required(requiredErrorMessage),
  phone: Yup.string()
    .required(requiredErrorMessage)
    .matches(regexPhone, validPhoneMessage),
  password: Yup.string()
    .min(6, validPassMessage)
    .required(requiredErrorMessage)
    .matches(regexPass, validPassMessage),
  confirmPassword: Yup.string()
    .min(6, validPassMessage)
    .required(requiredErrorMessage)
    .matches(regexPass, validPassMessage)
    .oneOf([Yup.ref('password'), null], confirmPassMessage),
});

const validateInformationSchema = Yup.object().shape({
  name: Yup.string().required(requiredErrorMessage),
  email: Yup.string().matches(regexEmail, validEmailMessage),
});

const validateConfirmPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, validPassMessage)
    .required(requiredErrorMessage)
    .matches(regexPass, validPassMessage),
  confirmPassword: Yup.string()
    .min(6, validPassMessage)
    .required(requiredErrorMessage)
    .matches(regexPass, validPassMessage)
    .oneOf([Yup.ref('password'), null], confirmPassMessage),
});
const validateUpdateSchema = Yup.object().shape({
  fullname: Yup.string()
    .matches(regexFullname, validFullnameMessage)
    .required(requiredErrorMessage),
  email: Yup.string()
    .matches(regexEmail, validEmailMessage)
    .required(requiredErrorMessage),
  phone: Yup.string()
    .required(requiredErrorMessage)
    .matches(regexPhone, validPhoneMessage),
});
const validateAddressSchema = Yup.object().shape({
  fullname: Yup.string()
    .matches(regexFullname, validFullnameMessage)
    .required(requiredErrorMessage),
  phone: Yup.string()
    .required(requiredErrorMessage)
    .matches(regexPhone, validPhoneMessage),
});
export {
  validateAddressSchema,
  validateLoginSchema,
  validateRegisterSchema,
  validateConfirmPasswordSchema,
  validateInformationSchema,
  validateEmailSchema,
  validateUpdateSchema,
};
