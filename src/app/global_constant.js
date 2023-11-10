import * as yup from "yup";
export const DEFAULT_PAGE_ITEM = 20;
export const PAGE_ITEM_LIST = [20, 50, 100, 500, 1000];


/*** Front */
export const GST_PERCENTAGE = 18;
export const GOOGLE_CAPTCHA_SITE_KEY = "6LeWkZUoAAAAAH-uaK5CzfWkf8p7HFDx7ju5u6lQ";
export const SITE_SECRET = "6LeWkZUoAAAAAOsb6EBCRAFLwky6keUrgQ7nowT0";

export const COMBO_PRODUCTS_FIELDS_NAME = [
  "first_product", 
  "second_product", 
  "third_product", 
  "fourth_product", 
  "fifth_product"
]

export const phoneSchema = yup
  .string()
  .matches(
    /^(\+\d{1,2}\s?)?(\()?\d{3}(\))?[-.\s]?\d{3}[-.\s]?\d{4}$/,
    "Phone Number should contain at most 10 characters."
  )
  .required("Phone Number can't be blank.");

  export const API_URL = "https://richkardz.com"
  export const API_IMG_URL = "https://richkardz.com"