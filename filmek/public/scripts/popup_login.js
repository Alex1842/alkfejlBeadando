$("a[href='/loginSignUp']").on('click', function (e) {
  e.preventDefault()
  
  const $modal = $('#loginModal')
  if ($modal.length>0) {
    $modal.modal('show')
  } else {
    const $modal = $(`
      <div class="modal fade confirm-modal" tabindex="-1" role="dialog" id="loginModal">
        <div class="modal-dialog modal-md" role="document">
          <div class="modal-content">
            <div class="modal-header">Login / Sign Up</div>
            <div class="modal-body">
              <div class="alert alert-danger"></div>
              <div class="form-area"></div>
            </div>
          </div>
        </div>
      </div>
    `)
    const $formContainer = $modal.find('.form-area')
    const $errorContainer = $modal.find('.alert').hide()
    $formContainer.load('/loginSignUp form', function () {
      $modal.modal('show')
      const $form = $modal.find('form')
      $form.on('submit', function(e) {
        e.preventDefault()
        const data = $(this).serializeArray()
        Promise.resolve(
          $.ajax({
            url: 'ajax/loginSignUp',
            method: 'POST',
            data,
            dataType: 'json',
            headers: { 'csrf-token': $('[name="_csrf"]').val() }
          })
        )
          .then(json => {
            if (json.success) {
              $('#navContainer').load('/ #navContainer', function() {
                $modal.modal('hide')
              })
            } else {
              $errorContainer.show().text('Nem megfelelő adatok')
            }
          })
          
          .catch(err => console.log(err))
      })  
    })
  }


  

  

})
//function scripts(){
//  var millisecondsToWait = 500;
//setTimeout(function() {
    // Whatever you want to do after the wait

    $(document).on('click', "a[href='/loginSignUp']", function (e) {


      console.log("kam")
     // $("div[class='modal-dialog modal-md'] i").hide();
     // $("div[class='modal-dialog modal-md'] button").prepend("<center>"); 
     // $("div[class='modal-dialog modal-md'] button").append("</center>"); 
    })
  //  }, millisecondsToWait);
//}
