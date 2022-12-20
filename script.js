	let b11 = new Date('2023-01-01T00:00:00')
	var debugoffset = 0
	var title_str = ""

	const audio = new Audio("./audio.mp3")
	

	//Скрытие кнопок при переходе в полноэкранный режим
	// Реакция на двойное нажатие по экрану
	document.addEventListener('dblclick', (e) => {
		toggleFullScreen()
	});
    function rainbow() {
        document.getElementsByClassName('bg')[0].style.animation = "rainbow 2s infinite"
    }
    function unrainbow() {
        document.getElementsByClassName('bg')[0].style.animation = "none"
    }
	// Функция входа/выхода из полноэкранного режима (украл из интернета)
	function toggleFullScreen() {
       if (!document.fullscreenElement &&    // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
         if (document.documentElement.requestFullscreen) {
           document.documentElement.requestFullscreen();
         } else if (document.documentElement.mozRequestFullScreen) {
           document.documentElement.mozRequestFullScreen();
         } else if (document.documentElement.webkitRequestFullscreen) {
           document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
         }
       } else {
          if (document.cancelFullScreen) {
             document.cancelFullScreen();
          } else if (document.mozCancelFullScreen) {
             document.mozCancelFullScreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          }
       }
     }
	window.onload = function() {
		enter = document.getElementById("enter")
		menu = document.getElementById("menu")
		volume = document.getElementById("volume")
		enter.onclick = () => {
			menu.style.display = "none"
			document.getElementsByClassName("clock-box")[0].style.zIndex = 0
			audio.play()
			audio.loop = true
			audio.volume = volume.value
		}

		volume.oninput = () => {
			audio.volume = volume.value
		}

		var x = setInterval(update, 1000)
	}
	// Функция проверки открыт ли сайт во весь экран
	function isFullScreen() {
		return window.innerHeight == screen.height
	}
	//Функция преобразования времени формата "ЧЧ:ММ:СС" в UNIX
	function t2u(str) {
		str_splitted = str.split(":")
		return new Date().setHours(str_splitted[0], str_splitted[1], str_splitted[2])
	}
	//Функция преобразования времени формата UNIX в "ЧЧ:ММ:СС"
	function u2t(unix) {
		unix -= (1*24+3)*60*60*1000
		return nTo0n(new Date(unix).getDate())+":"+nTo0n(new Date(unix).getHours())+":"+nTo0n(new Date(unix).getMinutes())+":"+nTo0n(new Date(unix).getSeconds())
	}
	// Функция универсального показа/скрытия элемента
	function toggle_element_visibility(e) {
		e.style.transitionDuration = "0.5s"
		if (e.style.scale != '0') {
			e.style.scale  = '0'
			e.style.opacity  = '0'
			e.style.filter = "blur(10px)"
		}
		else if (e.style.scale != '1') {
			e.style.scale  = '1'
			e.style.opacity  = '1'
			e.style.filter = "blur(0px)"
		}
	}
	function toggle_element_visibility_from_hidden_state(e) {
		if (e.style.scale != '1') {
			e.style.scale  = '1'
			e.style.opacity  = '1'
		}
		else {
			e.style.scale  = '0'
			e.style.opacity  = '0'
		}
	}
	//Функции показа/скрытия часов
	function clockToggle() {
		let clock = document.getElementsByClassName("clock-box")[0]
		toggle_element_visibility(clock)
	}
	//Целочисельное деление
	function div(val, by){
    		return (val - val % by) / by;
		}
    function isOdd(num) { return num % 2;}
	//Функция преобразования чисел формата "n" в "0n"
	function nTo0n(int){
    	if (int > 9) {
    		return int;
  		} else return `0${int}`;
	};
		
	// Основная функция часов, в начале из-за не стабильного API происходит получение отклонения времени несколько раз(нужно для точного отображения времени)
	function update() {
		diff = 0
		let time_with_offset = new Date() - diff + debugoffset;
		
		
		timestr = u2t(b11 - time_with_offset)
		console.log(b11 - time_with_offset)
		document.getElementById('clock').innerHTML = timestr
		document.title = `${timestr}`
		//document.getElementsByClassName('lecture')[current_para].innerHTML = shedule[storage.getItem('group_id')][weekday].split(";")[current_para] + " <"
	}