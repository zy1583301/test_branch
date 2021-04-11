export default {
    name: "el-button",
    // text: "Button 按钮",
    // attribute: {
    //     type: "primary"
    // },
    slot: {
        text: 'Button 按钮', // 组件内的文字
        // children: [], // 有此属性且为数组时可内嵌子组件
    },
    props: {
        value: '12',
        type: {
            zh: '按钮类型',
            type: 'array', // 操作类型
            current: 'primary', // 当前选择项
            options: [
                'default',
                'primary',
                'dashed',
                'text',
                'info',
                'success',
                'warning',
                'error',
            ],
        },
        ghost: {
            zh: '按钮透明',
            type: 'boolean',
            current: false,
        },
        size: {
            zh: '按钮大小',
            type: 'array',
            current: 'default',
            options: [
                'large',
                'small',
                'default',
            ],
        },
        shape: {
            zh: '按钮形状',
            type: 'array',
            current: false, // 为false时不生效该属性
            options: [
                'circle',
                false
            ],
        },
        long: {
            zh: '按钮满宽',
            type: 'boolean',
            current: false,
        },
        'html-type': {
            zh: 'button的type',
            type: 'array',
            current: 'button',
            options: [
                'button',
                'submit',
                'reset',
            ],
        },
        // disabled: {
        //     zh: '禁用中状态',
        //     type: 'boolean',
        //     current: false,
        // },
        loading: {
            zh: '加载中状态',
            type: 'boolean',
            current: false,
        },
        icon: {
            zh: '按钮图标',
            type: 'string',
            current: false,
        },
        'custom-icon': {
            zh: '按钮自定义图标',
            type: 'string',
            current: false,
        },
        replace: {
            zh: '路由跳转时,替换路由',
            type: 'boolean',
            current: false,
        },
        target: {
            zh: 'a 链接的 target',
            type: 'array',
            current: '_self',
            options: [
                '_blank',
                '_parent',
                '_self',
                '_top',
            ],
        },
        // to todo
        
    }
}