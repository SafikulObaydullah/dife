//`use strict`

const navMenu = function (renderMenuCallBack, isMobileMenu) {
    let _menu;
    const _moduleName = window.location.pathname.split('/')[1];

    const generateMenuDOM = (menuData, isParent) => {
        const ul = document.createElement('UL');
        isParent ? ul.classList.add('nav-menu') : '';

        menuData.forEach(menuItem => {
            const li = generateLIDOM(menuItem);

            if (menuItem.SubMenu.length) {
                li.appendChild(generateMenuDOM(menuItem.SubMenu, false));
            }

            ul.appendChild(li);
        });

        return ul;
    }

    const generateLIDOM = menuItem => {
        const li = document.createElement('LI');
        li.innerText = menuItem.ScreenMenuName;

        if (menuItem.ScreenFormName === '')
            return li;

        li.addEventListener('click', (e) => {
            window.open(menuItem.ScreenFormName, '_blank');
        });

        return li;
    }

    const generateMobileMenuDom = menuItems => {
        menuItems = [{
            ScreenFormName: '',
            ScreenMenuName: 'MENU',
            SubMenu: [...menuItems]
        }];

        return generateMenuDOM(menuItems, true);
    }

    function LoadMenu() {
        const data = new FormData();
        data.append("ModuleName", _moduleName);

        // Ugly down here
        blockUI();
       // $.blockUI({ message: '<h1><img src=' + baseUrl + '/Resources/Images/busy.gif /> Please wait...</h1>' });
        $.ajax({
            url: '/Home/GetUserMenuHtmlK',
            type: "POST",
            data: data,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function (response) {
                unblockUI();

                _menu = isMobileMenu
                    ? generateMobileMenuDom(response)
                    : generateMenuDOM(response, true);

                renderMenuCallBack(_menu);
            },
            error: function (xhr) {
                unblockUI();
                //popupNotification.error('Error Loading Menu!')
            }
        });
    };
    LoadMenu();
};