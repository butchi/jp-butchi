window.licker = window.licker || {};
(function(ns) {
	var number=0;
	var width = 256;
	var height = 256;
	var max = 6900;
	var min = 0;

	var $upBtn;
	var $downBtn;

	var touchStart = (window.ontouchstart !== void(0))? 'touchstart' : 'mousedown'
	var touchEnd = (window.ontouchend !== void(0))? 'touchend' : 'mouseup'

	var touching = false;

	var bn;

	$(function() {
		$upBtn = $('.area-tap .up');
		$downBtn = $('.area-tap .down');

		$num = $('#num');
		$num.attr('max', max);
		$num.attr('min', min);

		$num.on('change', function(e){
			var val = parseInt($(this).val());
			if(isFinite(val) && val >= min && val < max) {
				bn.setNumber(val);
				bn.draw();
			}
		});
		bn = new ns.module.ButchiNumber($num.val());
		bn.draw();

		$upBtn.on(touchStart, function() {
			var cnt = 0;
			touching = true;

			loop();
			function loop() {
				increment();

				if(touching) {
					setTimeout(function() {
						cnt++;
						loop();
					}, (cnt===0)? 500 : 10);
				}
			}
		});
		function increment() {
			if(bn.number < max) {
				bn.incr();
				bn.draw();
				$num.val(bn.number);
			}
		}

		$downBtn.on(touchStart, function() {
			var cnt = 0;
			touching = true;

			loop();
			function loop() {
				decrement();

				if(touching) {
					setTimeout(function() {
						cnt++;
						loop();
					}, (cnt===0)? 500 : 10);
				}
			}
		});
		function decrement() {
			if(bn.number > min) {
				bn.decr();
				bn.draw();
				$num.val(bn.number);
			}
		}

		$('body').on(touchEnd, function() {
			touching = false;
		});

		$('.area-tap .btn').on('mouseout', function() {
			touching = false;
		});
	});
}(window.licker));
