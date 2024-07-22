document.addEventListener('DOMContentLoaded', function () {

    // 001
    const docks = document.querySelectorAll('div[data-target]');
    const contents = document.querySelectorAll('div[data-content]');

    // 002
    const setting = document.querySelector('#h-setting');
    const settingList = document.querySelector('#h-setting-list');

    // 003
    const themeBtn = document.querySelector('#theme-btn');
    const infoBtn = document.querySelector('#info-btn');
    const themeWindow = document.querySelector('#theme-window');
    const infoWindow = document.querySelector('#info-window');

    // 005
    const imageList = document.querySelectorAll('.bg-image');

    /** 001:dock-item 클릭 **/
    docks.forEach(dock => {
        dock.addEventListener('click', function() {
            const target = this.getAttribute('data-target');

            contents.forEach(content => {
                if (content.getAttribute('data-content') === target) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });


    /** 002: setting-list 클릭 이벤트 **/
    setting.addEventListener('mouseenter', function () {
        settingList.style.display = 'block';
    });

    setting.addEventListener('mouseleave', function () {
        setTimeout(function () {
            if (!settingList.matches(':hover')) {
                settingList.style.display = 'none';
            }
        }, 100);
    });

    settingList.addEventListener('mouseleave', function () {
        settingList.style.display = 'none';
    });

    settingList.addEventListener('mouseenter', function () {
        settingList.style.display = 'block';
    });


    /** 003: setting-list 하위 항목 클릭 이벤트 **/
    themeBtn.addEventListener('click', function() {
        themeWindow.style.display = 'block';
    });
    infoBtn.addEventListener('click', function() {
        infoWindow.style.display = 'block';
    });
    document.addEventListener('click', function (event) {
        if (!themeWindow.contains(event.target) && !themeBtn.contains(event.target)) {
            themeWindow.style.display = 'none';
        }
        if (!infoWindow.contains(event.target) && !infoBtn.contains(event.target)) {
            infoWindow.style.display = 'none';
        }
    });


    /** 004: 현재 date, time 가져오기 **/
    function updateDateTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const date = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        
        const formattedDate = `${year}-${month}-${date}`;
        const formattedTime = `${hours}:${minutes} ${(hours < 12) ? 'AM' : 'PM' }`;
        
        document.querySelector('#h-date').textContent = `${formattedDate}`;
        document.querySelector('#h-time').textContent = `${formattedTime}`;
    }
    updateDateTime();
    setInterval(updateDateTime, 1000 * 60); // 1분마다 업데이트


    /** 005: 배경 설정 **/
    document.body.style.backgroundImage = `url('images/bg1.jpeg')`;
    imageList.forEach((image, index) => {
        image.style.backgroundImage = `url('images/bg${index + 1}.jpeg')`;
    });
    imageList.forEach((image, index) => {
        image.addEventListener('click', function() {
            document.body.style.backgroundImage = `url('images/bg${index + 1}.jpeg')`;
        });
    });


    /** 006: 갤러리 설정 **/
    const gallery = document.querySelector('#gallery-tab');

    for (var i = 0; i < 40; i ++) { // 낮은 순번의 이미지가 최하단으로 가도록 prepend 사용
        gallery.innerHTML += '<div class="gallery-image"></div>';
    }
    
    const galleryImages = document.querySelectorAll('.gallery-image');
    galleryImages.forEach((image, index) => {
        image.style.backgroundImage = `url('images/gallery/g-image${index + 1}.jpeg')`;
    });


    /** 007: 이미지 모달 박스 **/
    const modalArea = document.querySelector('.modal-area');
    const modalBox = document.querySelector('.modal-box');
    const modalImage = document.querySelector('#modal-image');

    galleryImages.forEach(image => {
        image.addEventListener('click', () => {
            modalArea.style.display = "block";
            modalImage.style.backgroundImage = image.style.backgroundImage;
        });
    });

    document.addEventListener('click', function (event) {
        if (modalBox.contains(event.target)) {
            modalArea.style.display = 'none';
        }
    });


});