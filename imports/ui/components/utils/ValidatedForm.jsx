import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import validate from "../../../modules/validate";

const styles = theme => ({});

class ValidatedForm extends Component {
  componentDidMount() {
    const component = this;
    const { rules, messages, theme } = this.props;
    validate(component.form, {
      rules,
      messages,
      ignore: ".public-DraftEditor-content",
      errorPlacement: function(error, element) {
        var parent = $(element)
          .parent()
          .parent();
        if (parent) {
          $(parent)
            .append(error)
            .css("color", theme.palette.custom.error);
        } else {
          error.insertAfter(parent).css("color", theme.palette.custom.error);
        }
      },
      submitHandler() {
        component.handleSubmit();
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const component = this;
    const { rules, messages, theme } = this.props;
    validate(component.form, {
      rules,
      messages,
      errorPlacement: function(error, element) {
        var parent = $(element)
          .parent()
          .parent();
        if (parent) {
          $(parent)
            .append(error)
            .css("color", theme.palette.secondary.main);
        } else {
          error.insertAfter(parent).css("color", theme.palette.custom.error);
        }
      },
      submitHandler() {
        component.handleSubmit();
      }
    });
  }

  handleSubmit = event => {
    this.props.onHandleSubmit();
  };

  render() {
    const { style } = this.props;
    return (
      <form
        style={style}
        ref={form => (this.form = form)}
        onSubmit={event => event.preventDefault()}
      >
        {this.props.children}
      </form>
    );
  }
}

ValidatedForm.propTypes = {
  rules: PropTypes.object,
  messages: PropTypes.object,
  onHandleSubmit: PropTypes.func.isRequired,
  style: PropTypes.object
};

export default withStyles(styles, { withTheme: true })(ValidatedForm);
