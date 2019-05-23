/**
 * 工具类
 * 
 */
export default {
    /**
     * 格式化一个数字为金额字符串
     * 
     * @param s {Number} 金额
     * @param n {Number} 精度（小数点后x位）
     * @returns {string}
     */
    formatAmount: function (s, n) {
        if (s > 1e15) return s;
        n = n > -1 && n <= 20 ? n : 2;

        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";

        var l = s.split(".")[0].split("").reverse(),
            r = s.split(".")[1];

        var t = "";

        //每千位加一个“，”。
        for (var i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }

        return (t.split("").reverse().join("") + (r ? "." + r : '')).replace('-,', '-');
    },

    /**
     * 遮罩电话号
     * 保留前3位后4位，其余为*
     */
    maskPhoneNumber: function (number, mask) {
        mask = mask || '*';
        if (!number) return '';
        if (number.length != 11) return number;
        var start, middle, end;
        start = number.substring(0, 3);
        end = number.substring(number.length - 4, number.length);
        middle = mask + mask + mask + mask;

        return start + middle + end;
    },

    /**
     * 是否为汉字
     *
     * @param s
     * @returns {boolean}
     */
    isChinese: function (s) {
        if (!s) return false;

        //汉字开头，中间不包括^'"=;<>|%以汉字结尾
        var patten = /^([\u4e00-\u9fa5]+[^'"=;<>|%\d]+[\u4e00-\u9fa5]*)$/;
        if (!patten.exec(s)) {
            return false;
        }
        return true;
    },

    /**
     * 是否为英文
     *
     * @param s
     * @returns {boolean}
     */
    isEnglish: function (s) {
        if (!s) return false;

        var pattern = /^[a-zA-Z]*$/;
        if (!pattern.exec(s)) {
            return false;
        }
        return true;
    },

    /**
     * eg: 某某民 -》 **民
     * @param name
     */
    nameMark: function (name) {
        if (!name || name.length < 2) return name;
        var a = [];
        var len = name.length - 1;
        for (var i = 0; i < len; ++i) {
            a[i] = '*';
        }
        a[len] = name.substr(-1);
        return a.join('');
    }
}