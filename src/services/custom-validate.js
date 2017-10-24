const isMobile = {
    messages: {
        en:(field, args) => field + '必须是11位手机号码',
    },
    validate: (value, args) => {
        return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
    }
}
export default {
    isMobile:isMobile
}