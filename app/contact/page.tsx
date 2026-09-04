'use client';

import { useState } from 'react';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();

    if (!name || !email || !message) {
      setError('Please fill in all fields.');
      return;
    }

    const newMessage = {
      id: Date.now(),
      name,
      email,
      message,
      status: 'New' as const,
      date: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    };

    try {
      const existingMessages = localStorage.getItem(
        'atelier-contact-messages'
      );

      const messages = existingMessages
        ? JSON.parse(existingMessages)
        : [];

      messages.push(newMessage);

      localStorage.setItem(
        'atelier-contact-messages',
        JSON.stringify(messages)
      );

      setSent(true);
      form.reset();
    } catch (err) {
      console.error('Unable to save contact message:', err);
      setError(
        'Unable to submit your message. Please try again.'
      );
    }
  };

  return (
    <div className="container section">
      <div
        style={{
          maxWidth: 760,
          margin: '0 auto',
        }}
      >
        <div
          className="page-top"
          style={{
            paddingTop: 0,
          }}
        >
          <div className="eyebrow">
            Support
          </div>

          <h1 className="h1">
            How can we help?
          </h1>

          <p className="muted">
            Have a question or problem? Send us a message
            and our team will get back to you.
          </p>
        </div>

        <div className="card padded">
          {sent ? (
            <div className="alert alert-success">
              Thanks — your message has been submitted
              successfully.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="field">
                  <label className="label">
                    Name
                  </label>

                  <input
                    className="input"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="field">
                  <label className="label">
                    Email
                  </label>

                  <input
                    className="input"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">
                  Message / Problem
                </label>

                <textarea
                  className="textarea"
                  name="message"
                  placeholder="Tell us about your problem..."
                  required
                />
              </div>

              {error && (
                <div
                  className="alert"
                  style={{
                    marginBottom: 16,
                  }}
                >
                  {error}
                </div>
              )}

              <button
                className="btn btn-primary"
                type="submit"
              >
                Send message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}