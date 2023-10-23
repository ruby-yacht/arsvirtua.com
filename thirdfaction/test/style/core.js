/* core.js */
/*
	A great deal of this code depends on the jQuery library by John Resig.
	More information on jQuery is available from http://jquery.com/
*/
/**
 * @fileoverview JavaScript library for RedCross.org
 * @projectDescription JavaScript library for RedCross.org
 * @author Navigation Arts (http://navarts.com/)
 * @version 2006-08-13
 * @Modified 2008-01-29 Tom Oliviero: Removed Yahoo Map API calls and modified name of ZIP Code field

 */
// variables and configuration items
	/** speed that animation effects should take place at, options are: normal, fast, slow, x-slow, x-fast */
	var animspeed = 'normal';
	/** default text strings for self-clearing form fields */
	var searchfield_txt = 'Search';
	var zipfield_txt = 'Enter your zip code';
	/** state managing variables for homepage subsection menu */
	var nav_main = false;
	var nav_sub = false;
	var nav_visible = false;
	var nav_open = false;
	var nav_close = false;
	/** */
	var useflash = false;
// reusable functions
	/**
	 * This function clips excess whitespace characters from a String.
	 * @param {String} str The text string you want to trim excess whitespace from.
	 * @return {String} The trimmed string.
	 */
	function trim(str) {
		str = this != window? this : str;
		return str.replace(/^\s+/g,'').replace(/\s+$/g,'');
	}
	/**
	 * Checks if the homepage expanding menu should be open or closed and adjusts it appropriately.
	 */
	function checkmenu(){
		if((nav_main || nav_sub) && !nav_visible){ 
			if(!nav_open && !nav_close){
				nav_open = true;
				$('div#subsections').slideDown(
					animspeed,
					function(){
						$('#flash-anim *').hide();
						nav_open = false;
						nav_visible = true;

					}
				);

			}

		}else if(!nav_main && !nav_sub && nav_visible){
			if(!nav_close && !nav_open){
				nav_close = true;
				$('#flash-anim *').show();
				$('div#subsections').slideUp(
					animspeed,
					function(){
						nav_close = false;
						nav_visible = false;

					}
				);

			}

		}

	}
// execute these actions when the DOM is ready to be manipulated
	$(document).ready(function(){
		/**
		 * This code manages the self-clearing and restoring "site search" form field.
		 */
			$('input[name=qt_temp]').val(searchfield_txt);
			$('input[name=qt_temp]').focus(function(){
				if($(this).val()==searchfield_txt){
					$(this).val('');
				}
			});
			$('input[name=qt_temp]').blur(function(){
				if(trim($(this).val())==''){
					$(this).val(searchfield_txt);
				}
			});
		/**
		 * This code manages the self-clearing and restoring Zip code form field for local content.
		 */
			$('div#local-find input#zipcode').val(zipfield_txt);
			$('div#local-find input#zipcode').focus(function(){
				if($(this).val()==zipfield_txt){
					$(this).val('');
				}			
			});
			$('div#local-find input#zipcode').blur(function(){
				if(trim($(this).val())==''){
					$(this).val(zipfield_txt);
				}			
			});
			
		/**
				 * This code displays default local content if there are no local events or local news items 
		 */

		if(!($('#local-news').length||$('#local-events').length)){
				$('div#local-default').show();
		}

		/**
		 * This code manages the second tier navigation on the homepage
		 */
		if($('body#home').get(0)){
			timeit = setInterval('checkmenu()',100);
			$('ul#mainnav').mouseover(function(){
				nav_main = true;

			});
			$('ul#mainnav').mouseout(function(){
				nav_main = false;

			});
			$('div#subsections').mouseover(function(){
				nav_sub = true;

			});
			$('div#subsections').mouseout(function(){
				nav_sub = false;
				$('a.highlightsub').removeClass('highlightsub');

			});
			/**
			 * highlight top level homepage sections based on second-level hovers.
			 */
			$('#sub-nav-1').mouseover(function(){
				$('#nav-1 a').addClass('highlightsub');
				$('#nav-2 a').removeClass('highlightsub');
				$('#nav-3 a').removeClass('highlightsub');
				$('#nav-4 a').removeClass('highlightsub');
			});
			$('#sub-nav-2').mouseover(function(){
				$('#nav-1 a').removeClass('highlightsub');
				$('#nav-2 a').addClass('highlightsub');
				$('#nav-3 a').removeClass('highlightsub');
				$('#nav-4 a').removeClass('highlightsub');
			});
			$('#sub-nav-3').mouseover(function(){
				$('#nav-1 a').removeClass('highlightsub');
				$('#nav-2 a').removeClass('highlightsub');
				$('#nav-3 a').addClass('highlightsub');
				$('#nav-4 a').removeClass('highlightsub');
			});
			$('#sub-nav-4').mouseover(function(){
				$('#nav-1 a').removeClass('highlightsub');
				$('#nav-2 a').removeClass('highlightsub');
				$('#nav-3 a').removeClass('highlightsub');
				$('#nav-4 a').addClass('highlightsub');
			});

		}
		/**
		 * highlight rows in response steps sections
		 */
			$('body#home div.response-steps ul li').mouseover(function(){
				$(this).addClass('over');

			});
			$('body#home div.response-steps ul li').mouseout(function(){
				$(this).removeClass('over');
			});
		/**
		 * flash replacement
		 */
			if($('body#home').get(0)){
				if(usemovie){
					swfobj = new SWFObject(usemovie,'myswf','776','172','7','#ffffff');
					swfobj.addParam('quality','high');
					swfobj.addParam('menu','false');
					swfobj.addParam('wmode','transparent');
					swfobj.write('flash-anim');
				}
			}
	});