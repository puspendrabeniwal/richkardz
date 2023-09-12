"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Editor } from "primereact/editor";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string()
    .required("Content is required")
    .min(10, "Content is too short"),
});

const EmailTempForm = ({ emailValue, handleSubmitEmail, emailId }) => {
  const defaultValues = {
    title: emailValue ? emailValue.title : "",
    content: emailValue ? emailValue.content : "",
  };

  const onSubmit = async (values) => {
    let loginUser = JSON.parse(localStorage.getItem("loginInfo"));
    let formData = new FormData();
    formData.append("user_id", loginUser._id);
    Object.keys(values).forEach(function (key, index) {
      formData.append(key, values[key]);
    });
    await handleSubmitEmail(values);
  };
  return (
    <main>
      <div
        className="content d-flex flex-column flex-column-fluid"
        id="kt_content"
      >
        <div className=" d-flex flex-column-fluid" id="kt_post">
          <div id="kt_content_container" className="container-xxl">
            <div className="card">
              <div className="card-body py-9">
                <Formik
                  initialValues={defaultValues}
                  validationSchema={validationSchema}
                  onSubmit={async (values, { resetForm }) => {
                    await onSubmit(values);
                    resetForm();
                  }}
                >
                  {({ isSubmitting, setFieldValue, values }) => (
                    <Form className="form-design">
                      <div className="row mb-3">
                        <div className="col-lg-12 col-md-12">
                          <label
                            className="col-form-label required fw-semibold fs-6"
                            htmlFor="floatingname"
                          >
                            Title
                          </label>

                          <Field
                            type="text"
                            name="title"
                            className="form-control"
                            id="floatingname"
                          />

                          <ErrorMessage
                            name="title"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label
                          className="col-form-label required fw-semibold fs-6"
                          htmlFor="floatingDesc"
                        >
                          Content
                        </label>
                        <div className=" billingForm">
                          <Editor
                            style={{ height: "320px" }}
                            id="content"
                            name="content"
                            value={values.content}
                            filter={false}
                            onTextChange={(e) => {
                              setFieldValue("content", e.htmlValue);
                            }}
                          />
                        </div>
                        <ErrorMessage
                          name="content"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div>
                        <button
                          type="submit"
                          className="btn btn btn-success me-3"
                          data-kt-menu-trigger="click"
                          data-kt-menu-placement="bottom-end"
                          disabled={isSubmitting}
                        >
                          {emailId ? "Update" : "Add"}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EmailTempForm;
