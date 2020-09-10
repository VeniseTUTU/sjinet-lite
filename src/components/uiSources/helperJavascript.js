
	    jQuery(document).ready(function($){
		
		$( ".vdropdown" ).click(function() {
		$( ".vdropdownwrap" ).slideToggle( "slow" );
	        });
                
                $( ".showBillInfo" ).click(function() {
		$( ".BillInfo" ).slideToggle( "slow" );
	        });
		
		$( ".filterTitl" ).each(function(){
	      $(this).click(function() {
		$('.filterTitl').next('.sizePickerCOnM').slideUp();
		$(this).next('.sizePickerCOnM').slideDown();
		  
		});
	      });
	
	    });
