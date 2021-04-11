const Button = {
    name: "Button",
    text: "Button 按钮",
    attribute: {
        type: "primary"
    }
}

const Card = {
    name: "Card",
    text: "Card 卡片",
    children: []
}

const Input = {
    name: "Input",
    attribute: {
        placeholder: "Enter something..."
    },
    data: "123"
}

const Tabs = {
    name: "Tabs",
    children: [
        {
            name: "TabPane",
            attribute: {
                label: "标签一"
            },
            text: "标签一的内容",
            children: []
        },
        {
            name: "TabPane",
            attribute: {
                label: "标签二"
            },
            text: "标签二的内容",
            children: []
        },
        {
            name: "TabPane",
            attribute: {
                label: "标签三"
            },
            text: "标签三的内容",
            children: []
        },
    ]
}

export default {
    Button,
    Card,
    Input,
    Tabs,
}