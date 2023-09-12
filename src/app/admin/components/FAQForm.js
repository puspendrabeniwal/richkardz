"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Editor } from "primereact/editor";

const validationSchema = Yup.object().shape({
  question: Yup.string().required("Question is required"),
  answer: Yup.string()
    .required("Answer is required")
    .min(10, "Answer is too short"),
});

const FaqForm = ({ faqValue, handleSubmitFaq, faqId }) => {
  const defaultValues = {
    question: faqValue ? faqValue.question : "",
    answer: faqValue ? faqValue.answer : "",
  };

  const onSubmit = async (values, { setSubmitting }) => {
    let loginUser = JSON.parse(localStorage.getItem("loginInfo"));
    let formData = new FormData();
    formData.append("user_id", loginUser._id);
    Object.keys(values).forEach(function (key, index) {
      formData.append(key, values[key]);
    });
    await handleSubmitFaq(values);
    setSubmitting(false);
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
                  // onSubmit={async (values) => await onSubmit(values)}
                  onSubmit={onSubmit}
                >
                  {({ isSubmitting, setFieldValue, values }) => (
                    <Form className="form-design">
                      <div className="row mb-3">
                        <div className="col-lg-12 col-md-12">
                          <label
                            className="col-form-label required fw-semibold fs-6"
                            htmlFor="floatingname"
                          >
                            Question
                          </label>

                          <Field
                            type="text"
                            name="question"
                            className="form-control"
                            id="floatingname"
                          />

                          <ErrorMessage
                            name="question"
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
                          Answer
                        </label>
                        <div className=" billingForm">
                          <Editor
                            style={{ height: "320px" }}
                            id="answer"
                            name="answer"
                            value={values.answer}
                            filter={false}
                            onTextChange={(e) => {
                              setFieldValue("answer", e.htmlValue);
                            }}
                          />
                        </div>
                        <ErrorMessage
                          name="answer"
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
                          {faqId ? "Update" : "Add"}
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

export default FaqForm;
