---
title: "Rails Exception Reporting with JSON"
tag: "ruby"
date: "2025-08-08"
description: "How do you return the exception to the UI in a Rails project"
---

The Rails project I'm working on contains a significant amount of legacy code, which frequently triggers exceptions. This is an ongoing issue we have to tolerate until we can carry out a major refactor.

Currently, exceptions are logged and trigger automated email alerts. However, in most cases, it's the users who notify us that something has gone wrong.

The problem is that end users only see a generic "Internal Server Error" message, which provides no insight into the cause of the failure.

To improve this, you can modify the Rails server to send the error trace directly to the user. Note: If the application is externally facing, this approach raises concerns about exposing sensitive data.

When our UI receives an error response, we can enhance the user experience by displaying more detailed information about the failure.

```ruby
# app/lib/custom_exception_wrapper.rb
class CustomExceptionWrapper < ActionDispatch::ExceptionWrapper
  def render_exception
    if @request.format.json?
      {
        status: :internal_server_error,
        message: @exception.message,
        trace: Rails.env.development? ? @exception.backtrace : [] # Include backtrace in development
      }.to_json
    else
      super # Fallback to default HTML rendering for other formats
    end
  end
end
```

```ruby
# config/application.rb or config/environments/development.rb
config.exceptions_app = ->(env) {
  CustomExceptionWrapper.new(env, env['action_dispatch.exception']).render
}
```
