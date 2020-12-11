export default {
    tagName: 'e-extElem',
    template: `<h1>{this.d} {this.prop.name} {this.$store.tst}</h1>`,
    $store: { name: 'e-extElem', type: "local", store: { state: { name: "ext elem", tst: "from store" } } },
    data: {
        d: 'from external'
    },
    exec: function (state) {
        console.log('executed', this.data.d);
        this.data.d = 'changed'
    },
    created: function (state) {
        console.log('created');
    },
    updated: function () {
        console.log('updated');
    }
}
