"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Editor } from "primereact/editor";
import { Button } from "primereact/button";
import Link from "next/link";
import { ProgressSpinner } from "primereact/progressspinner";

const validationSchema = Yup.object().shape({
  question: Yup.string().required("Question is required"),
  answer: Yup.string()
    .required("Answer is required")
    .min(10, "Answer is too short"),
});

const FaqForm = ({ faqValue, handleSubmitFaq, faqId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues = {
    question: faqValue ? faqValue.question : "",
    answer: faqValue ? faqValue.answer : "",
  };

  const onSubmit = async (values) => {
    let loginUser = JSON.parse(localStorage.getItem("loginInfo"));
    let formData = new FormData();
    formData.append("user_id", loginUser._id);
    Object.keys(values).forEach(function (key, index) {
      formData.append(key, values[key]);
    });
    await handleSubmitFaq(values);
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
                    setIsLoading(true);
                    await onSubmit(values);
                    setIsLoading(false);
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

                      <div className="mt-7">
                        <Button
                          className="btn btn btn-success btn-sm me-3"
                          data-kt-menu-trigger="click"
                          data-kt-menu-placement="bottom-end"
                          icon="pi pi-save"
                          label="Submit"
                        />
                        <Link href="/admin/faq ">
                          <Button
                            className="btn btn btn-danger btn-sm me-3"
                            data-kt-menu-trigger="click"
                            data-kt-menu-placement="bottom-end"
                            icon="pi pi-times"
                            label="Cancel"
                            disabled={isLoading}
                          />
                        </Link>
                        {isLoading && (
                          <ProgressSpinner
                            style={{ width: "30px", height: "30px" }}
                          />
                        )}
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
