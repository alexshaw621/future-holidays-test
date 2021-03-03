/**
 * Register Page
 * ------------------------------------------------------------------------------
 * @TODO: Sanitize
 * @namespace register
 */
import $ from 'jquery';
const selectors = {
  registerForm: '[data-register-form]',
  email: '[data-form-email]',
  password: '[data-form-password]',
};

$(document).ready(function(){
  /*
  $(selectors.registerForm).on('submit', function(e) {
    e.preventDefault();
    
    $.ajax({
      url: '/account',
      method: 'POST',
      cache: false,
      data: $(this).serialize(),
      success: function() {
        const data = {
          'form_type': 'customer_login',
          'customer[email]': $(selectors.email).val(),
          'customer[password]': $(selectors.password).val()
        }
        $.ajax({
          url: '/account/login',
          cache: false,
          type: 'post',
          data: data,
          beforeSend: function(){
          },
          success: function (data) {
            location.href = '/account';
          }
        });
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
      }
    })
  })
  */
})