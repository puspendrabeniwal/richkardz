"use client";
import React from "react";
import ProductForm from "../../components/ProductForm";
const AddProduct = () => {
  const handleAddProduct = async (data) => {
    console.log("submit,data", data);
  };
  return (
    <>
      <ProductForm
        productValue={null}
        handleSubmitProduct={handleAddProduct}
        productId={null}
      />
    </>
    // <>
    //   <div
    //     className="wrapper d-flex flex-column flex-row-fluid"
    //     id="kt_wrapper"
    //   >
    //     <div className="p-4">
    //       <Formik
    //         initialValues={{
    //           name: "",
    //           price: "",
    //           discountPrice: "",
    //           profession: "",
    //           cardType: "",
    //           isFeature: "",
    //           isNewFeature: "",
    //           productDescription: "",
    //           status: "",
    //           fileUpload: [],
    //         }}
    //         validationSchema={validationSchema}
    //         onSubmit={async (values) => await onSubmit(values)}
    //       >
    //         {({ setFieldValue }) => (
    //           <Form>
    //             <div></div>
    //             <div className="row mb-3">
    //               <div className="col-lg-4 col-md-4">
    //                 <label htmlFor="floatingname">
    //                   Product Name<span className="text-danger">*</span>
    //                 </label>
    //                 <div className="form-floating ">
    //                   <Field
    //                     type="text"
    //                     name="name"
    //                     className="form-control"
    //                     id="floatingname"
    //                   />
    //                 </div>
    //                 <ErrorMessage
    //                   name="name"
    //                   component="div"
    //                   className="text-danger"
    //                 />
    //               </div>
    //               <div className="col-lg-4 col-md-4">
    //                 <label htmlFor="floatingPrice">
    //                   Price<span className="text-danger">*</span>
    //                 </label>
    //                 <div className="form-floating billingForm">
    //                   <Field
    //                     type="text"
    //                     name="price"
    //                     className="form-control"
    //                     id="floatingPrice"
    //                   />
    //                 </div>
    //                 <ErrorMessage
    //                   name="price"
    //                   component="div"
    //                   className="text-danger"
    //                 />
    //               </div>
    //               <div className="col-lg-4 col-md-4">
    //                 <label htmlFor="floatingDescription">
    //                   Discount Price<span className="text-danger">*</span>
    //                 </label>
    //                 <div className="form-floating billingForm">
    //                   <Field
    //                     type="text"
    //                     name="discountPrice"
    //                     className="form-control"
    //                     id="floatingDescription"
    //                   />
    //                 </div>
    //                 <ErrorMessage
    //                   name="discountPrice"
    //                   component="div"
    //                   className="text-danger"
    //                 />
    //               </div>
    //             </div>
    //             <div className="row mb-3">
    //               <div className="col-lg-4 col-md-4">
    //                 <label htmlFor="floatingprofession">
    //                   Profession<span className="text-danger">*</span>
    //                 </label>
    //                 <Field
    //                   as="select"
    //                   name="profession"
    //                   className="form-control"
    //                   id="floatingprofession"
    //                 >
    //                   <option value="">Select</option>
    //                   <option value="1">CA</option>
    //                   <option value="2">Doctor</option>
    //                   <option value="3">Lowyers</option>
    //                   <option value="4">agent</option>
    //                   <option value="5">Student</option>
    //                 </Field>

    //                 <ErrorMessage
    //                   name="profession"
    //                   component="div"
    //                   className="text-danger"
    //                 />
    //               </div>
    //               <div className="col-lg-4 col-md-4">
    //                 <label htmlFor="floatingtype">
    //                   Card Type<span className="text-danger">*</span>
    //                 </label>
    //                 <Field
    //                   as="select"
    //                   name="cardType"
    //                   className="form-control"
    //                   id="floatingtype"
    //                 >
    //                   <option value="">Select</option>
    //                   <option value="1">CA</option>
    //                   <option value="2">Doctor</option>
    //                   <option value="3">Lowyers</option>
    //                   <option value="4">agent</option>
    //                   <option value="5">Student</option>
    //                 </Field>

    //                 <ErrorMessage
    //                   name="cardType"
    //                   component="div"
    //                   className="text-danger"
    //                 />
    //               </div>
    //               <div className="col-lg-4 col-md-4">
    //                 <label htmlFor="floatingFeature">
    //                   Is Feature<span className="text-danger">*</span>
    //                 </label>
    //                 <Field
    //                   as="select"
    //                   name="isFeature"
    //                   className="form-control"
    //                   id="floatingFeature"
    //                 >
    //                   <option value="">Select</option>
    //                   <option value="1">Yes</option>
    //                   <option value="2">No</option>
    //                 </Field>

    //                 <ErrorMessage
    //                   name="isFeature"
    //                   component="div"
    //                   className="text-danger"
    //                 />
    //               </div>
    //             </div>
    //             <div className="row mb-3">
    //               <div className="col-lg-4 col-md-4">
    //                 <label htmlFor="floatingNewFeature">
    //                   Is New Feature<span className="text-danger">*</span>
    //                 </label>
    //                 <Field
    //                   as="select"
    //                   name="isNewFeature"
    //                   className="form-control"
    //                   id="floatingNewFeature"
    //                 >
    //                   <option value="">Select</option>
    //                   <option value="1">Yes</option>
    //                   <option value="2">No</option>
    //                 </Field>
    //                 <ErrorMessage
    //                   name="isNewFeature"
    //                   component="div"
    //                   className="text-danger"
    //                 />
    //               </div>
    //               <div className="col-lg-4 col-md-4">
    //                 <label htmlFor="floatinDescription">
    //                   Product Description
    //                   <span className="text-danger">*</span>
    //                 </label>
    //                 <div className="form-floating billingForm">
    //                   <Field
    //                     type="text"
    //                     name="productDescription"
    //                     className="form-control"
    //                     id="floatinDescription"
    //                   />
    //                 </div>
    //                 <ErrorMessage
    //                   name="productDescription"
    //                   component="div"
    //                   className="text-danger"
    //                 />
    //               </div>
    //               <div className="col-lg-4 col-md-4">
    //                 <label htmlFor="floatingstatus">
    //                   Status<span className="text-danger">*</span>
    //                 </label>
    //                 <Field
    //                   as="select"
    //                   name="status"
    //                   className="form-control"
    //                   id="floatingstatus"
    //                 >
    //                   <option value="">Select</option>
    //                   <option value="2">Active</option>
    //                   <option value="3">Inactive</option>
    //                 </Field>
    //                 <ErrorMessage
    //                   name="status"
    //                   component="div"
    //                   className="text-danger"
    //                 />
    //               </div>
    //             </div>
    //             <div className="row mb-3">
    //               <div className="col-lg-4 col-md-4">
    //                 <label htmlFor="floatingUpload">
    //                   Image Upload<span className="text-danger">*</span>
    //                 </label>
    //                 <div className="form-floating billingForm">
    //                   <Field
    //                     type="file"
    //                     name="fileUpload"
    //                     multiple
    //                     accept="image/*"
    //                     className="form-control"
    //                     id="floatingUpload"
    //                     value={undefined}
    //                     onChange={(event) => {
    //                       const files = event.currentTarget.files;
    //                       const images = Array.from(files);
    //                       console.log("filessss", images);
    //                       // Manually set the field value to trigger Formik's handling
    //                       // of array values.
    //                       setFieldValue("fileUpload", images);
    //                     }}
    //                   />
    //                 </div>
    //                 <ErrorMessage
    //                   name="fileUpload"
    //                   component="div"
    //                   className="text-danger"
    //                 />
    //               </div>
    //             </div>
    //             <button type="submit" className="p-3">
    //               Submit
    //             </button>
    //           </Form>
    //         )}
    //       </Formik>
    //     </div>
    //   </div>
    // </>
  );
};

export default AddProduct;
