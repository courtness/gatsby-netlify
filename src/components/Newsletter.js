import React, { useEffect, useState } from "react";
import { validateEmail } from "~utils/helpers";

const Newsletter = () => {
  const [formData, setFormData] = useState({});
  const [interacted, setInteracted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (!interacted) {
      return;
    }

    if (
      !formData.name ||
      formData.name === `` ||
      !formData.email ||
      !validateEmail(formData.email)
    ) {
      setValid(false);
    } else {
      setValid(true);
    }
  }, [formData]);

  //

  const onSubmit = e => {
    e.preventDefault();

    if (!valid || submitting || submitted) {
      return false;
    }

    setSubmitting(true);

    setTimeout(() => {
      setSubmitted(true);
    }, 2000);

    // TODO : add your Mailchimp, Klaviyo...

    return false;
  };

  //

  let buttonText = `Submit`;

  if (submitted) {
    buttonText = `Submitted`;
  } else if (submitting) {
    buttonText = `Submitting`;
  }

  return (
    <section className="w-full relative pt-16 pb-20 overflow-hidden bg-black text-white">
      <form className="grid" onSubmit={onSubmit}>
        <div className="grid-end-5 grid-start-2">
          <h2 className="f3">Sign up to our newsletter</h2>
          <h2 className="mt-6 b1">
            We promise not to overload you with daily emails about trends and
            other boring stuff.
          </h2>
        </div>

        <div className="grid-end-5 xs:grid-end-12 flex flex-col">
          <input
            className="w-full h-12 relative block mt-2 px-2 border-black bg-white b1 text-black"
            onChange={e => {
              setInteracted(true);
              setFormData({ ...formData, name: e.target.value });
            }}
            placeholder="Name"
            type="text"
          />

          <input
            className="w-full h-12 relative block mt-2 px-2 border-black bg-white b1 text-black"
            onChange={e => {
              setInteracted(true);
              setFormData({ ...formData, email: e.target.value });
            }}
            placeholder="Email address"
            type="email"
          />

          <input
            className={`${
              valid && !submitting && !submitted
                ? ``
                : `opacity-50 pointer-events-none`
            } button button--white w-48 self-end relative mt-2 xs:mt-1 py-4 cursor-pointer caption uppercase`}
            type="submit"
            value={buttonText}
          />
        </div>
      </form>
    </section>
  );
};

export default Newsletter;
