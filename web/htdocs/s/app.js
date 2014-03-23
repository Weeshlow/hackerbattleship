$(document).ready(function() {
  $('.grid_space').on('click', function() {
    //alert('pop');
    $(location).attr('href', '/?mth=sub&chal='+$(this).data('chal'));
  });
});
