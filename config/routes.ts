export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },

  // ---------- start page1 -------------------------
  {
    name: 'BasicLayout',
    path: '/layout',
    component: './BasicLayout',
    routes: [
      {
        path: '/layout',
        redirect: '/layout/general',
      },
      {
        name: 'General',
        path: '/layout/general',
        component: './404',
        hideInMenu: true,
      },
      {
        name: 'publish',
        path: '/layout/publish',
        component: './Publish',
        hideInMenu: true,
      },
      {
        name: 'overflow-tooltip',
        path: '/layout/overflow-tooltip',
        component: './OverflowTooltip',
        hideInMenu: true,
      },
    ],
  },
  // ---------- end page1 -------------------------

  // ------------------ start 无用页面---------------------------------------------------------
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  // ------------------- end -----------------------------------------------------

  {
    path: '/',
    redirect: '/layout',
  },
  {
    component: './404',
  },
];
