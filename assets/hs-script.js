$(document).ready(function(){

  
  PersonalizerEvents.init()
  
    
  $('.quantity').on('change',function(e){
    qty = parseInt($(this).val())
    $('.quantity').val(qty)
    if (qty < 2){
      var inputs = PersonalizerView.buildMonogramInput(1)
    } else {
      var inputs = ''
      for (var i = 1; i <= qty; i++){
        inputs += PersonalizerView.buildMonogramInput(i)
      }
    }
    $('.text-input-containers').html(inputs)
  })

})

var PersonalizerEvents = {
  init: function(){
    this.setModal()
    this.fontSelect()
    this.monogramColorSelect()
    this.patchColorSelect()
    this.locationSelect()
    this.monogramChange()
    this.monogramFocus()
    this.monogramContinueClick()
    this.locationContinueClick()
    this.patchContinueClick()
    this.backClick()
    this.tabSelect()
    this.patchSelect()
  },
  setModal: function(){
    var modal_width = '870px';
    if($(window).width() >= 1200 || $('html').hasClass('ie')) {
      modal_width = '1110px'
    }
    $(".personalize_modal").fancybox({
      width: modal_width,
      height: 'auto',
      autoSize: false,
      padding: 10,
      afterShow: function(e) {
        var $gallery = $('.' + $(this.element).data('gallery'));
        $("img", $gallery).unveil();
        var selector = $('.fancybox-opened').find('.selector-wrapper select');
        selector.trigger('change');
      },
      beforeShow: function(e) {
        var $gallery = $('.' + $(this.element).data('gallery'));
        var $product = $(this.element).data("fancybox-href");
        var thumbnailPosition = $gallery.parents('.product_section').data('thumbnail');
        var slideshowAnimation = $gallery.parents('.product_section').data('slideshow-animation');
        var slideshowSpeed = $gallery.parents('.product_section').data('slideshow-speed');

        $gallery.flexslider({
          startAt: parseInt($('.featured_image', $(this)).data('index'), 10),
          touch: true,
          pauseOnHover: true,
          controlNav: thumbnailPosition == "no-thumbnails" ? false : "thumbnails",
          directionNav: thumbnailPosition == "no-thumbnails" ? true : false,
          animation: slideshowAnimation == 'none' || slideshowAnimation == 'zoom' ? 'fade' : slideshowAnimation,
          slideshow: slideshowAnimation == 'none' || slideshowAnimation == 'zoom' ? false : true,
          slideshowSpeed: slideshowSpeed ? slideshowSpeed*1000 : 10*1000,
          start: function(slider){
            slider.resize();
          }
        });

        if (slideshowAnimation == 'slide'){
          if($gallery.data("index") == 0) { $('.flex-direction-nav', $gallery).hide() }
        } else {
          if($gallery.length == 1) { $('.flex-direction-nav', $gallery).hide() }
        }
      }
    });
  },
  patchSelect: function(){
    $('.patch-opt').click(function(e){
      $('.patch-opt.selected').removeClass('selected')
      var font = $(this).data('font')
      var patchValue = $(this).data('patchvalue')
      var patchImg = $(this).css('-webkit-mask-image')
      $('#monogramPatch').val(patchValue)
      $(this).addClass('selected')
      $('#patchScreen .patch-preview-container .monogram-icon').css('-webkit-mask-image', patchImg)
    })
  },
  fontSelect: function(){
    $('.font').click(function(e){
      $('.font.selected').removeClass('selected')
      var font = $(this).data('font')
      var fontValue = $(this).data('fontvalue')
      $('#monogramStyle').val(fontValue)
      $(this).addClass('selected')
      $('.monogram-text').css('font-family',font)
    })
  },
  monogramColorSelect: function(){
    $('#monogramScreen .colors .color').click(function(e){
      $('#monogramScreen .colors .color.selected').removeClass('selected')
      var color = $(this).css('background-color')
      var colorTitle = $(this).data('color')
      $('#monogramColor').val(colorTitle)
      $(this).addClass('selected')
      $('.monogram-text').css('color',color)
    })
  },
  patchColorSelect: function(){
    $('#patchScreen .colors .color').click(function(e){
      $('#patchScreen .colors .color.selected').removeClass('selected')
      var color = $(this).css('background-color')
      var colorTitle = $(this).data('color')
      $('#patchColor').val(colorTitle)
      $(this).addClass('selected')
      $('.monogram-icon').css('background-color',color)
    })
  },
  locationSelect: function(){
    $('.locations .location').click(function(e){
      $('.locations .location.selected').removeClass('selected')
      var location = $(this).data('location')
      $('.monogramLocation').val(location)
      $(this).addClass('selected')
    })
  },
  monogramChange: function(){
    $('.monogram-input .text-input-containers').on('keyup', '.text-input-container input',function(e){
      PersonalizerEvents.updateMonogram(this)
    })
  },
  monogramFocus: function(){
    $('.monogram-input .text-input-containers').on('focus', '.text-input-container input',function(e){
      PersonalizerEvents.updateMonogram(this)
    })
  },
  updateMonogram: function(input){
    var text = $(input).val().toUpperCase()
    if ($('.patch-preview-container .monogram-text').hasClass('luggage_tag')){
    } else {
      if (text.length < 4){
        $('.patch-preview-container .monogram-text').removeClass('small')
        $('.patch-preview-container .monogram-text').addClass('large')
        $('.patch-preview-container .monogram-text').removeClass('med')
      }
      if (text.length > 4){
        $('.patch-preview-container .monogram-text').removeClass('small')
        $('.patch-preview-container .monogram-text').removeClass('large')
        $('.patch-preview-container .monogram-text').addClass('med')
      }
      if (text.length > 6){
        $('.patch-preview-container .monogram-text').addClass('small')
        $('.patch-preview-container .monogram-text').removeClass('large')
        $('.patch-preview-container .monogram-text').removeClass('med')
      }
    }
    $('#monogramScreen .patch-preview-container .monogram-text').html(text)
  },
  monogramContinueClick: function(){
    $('#monogramScreen .personalizer-continue .proceed').click(function(e){
      e.preventDefault()
      if ( PersonalizerValidator.checkMonogramText() == true ){
        $('.font-monogram-select-screen').addClass('hide')
        $('.location-select-screen').removeClass('hide')
        $('.action_button.hide').removeClass('hide')
        $(this).addClass('hide')
      }
    })
  },
  locationContinueClick: function(){
    $('.location-check').click(function(e){
      var event = e
      if ( PersonalizerValidator.checkLocationSelect() != true ){
        event.preventDefault()
      }
    })
  },
  patchContinueClick: function(){
    $('#patchScreen .personalizer-continue .proceed').click(function(e){
      e.preventDefault()
      $('.font-monogram-select-screen').addClass('hide')
      $('.location-select-screen').removeClass('hide')
      $('.action_button.hide').removeClass('hide')
      $(this).addClass('hide')
    })
  },
  backClick: function(){
    $('.personalizer-continue .back_button').click(function(e){
      e.preventDefault()
      $(this).addClass('hide')
      $('.font-monogram-select-screen').removeClass('hide')
      $('.location-select-screen').addClass('hide')
      $('.action_button.proceed').removeClass('hide')
      $('.add_to_cart').addClass('hide')

    })
  },
  tabSelect: function(){
    $('.personalizer-tabs a').click(function(e){
      e.preventDefault()
      $('.personalizer-screen.active').removeClass('active')
      $($(this).data('target')).addClass('active')
    })
  }
}

var PersonalizerView = {
  buildMonogramInput: function(count){
    return "<div class='text-input-containers'><div class='text-input-container'><div class='text-input-num'>" + count + ".</div><input type='text' class='initials' maxlength='10' autocomplete='off' autocorrect='off' autocapitalize='off'  name='properties[Monogram Text " + count + "]'/></div></div>"
  }
}

var PersonalizerValidator = {
  checkMonogramText: function(){
    if ( $('.monogram-input input').val().length < 1 ){
      $('.monogram-input .error').removeClass('hide')
      return false
    } else {
      $('.monogram-input .error').addClass('hide')
      return true
    }
  },
  checkLocationSelect: function(){
    if ( $('.location-selection .location.selected').length < 1 ){
      $('.location-selection .error').removeClass('hide')
      return false
    } else {
      $('.location-selection .error').addClass('hide')
      return true
    }
  }
}
