Ext.define("mobile.view.ContactList", {

    extend : 'Ext.dataview.List',
    xtype  : 'contact_list',

    requires : [
        'Ext.data.Store'
    ],

    config     : {
        grouped  : true,
        indexBar : true,
        schema   : false,

        itemTpl : ''.concat(
//            '<div class="contact">',
//                '<div class="photo" style="background-image: url(http://src.sencha.io/30/{imageUrl});"></div>',
            '{firstName} <span class="last_name">{lastName}</span>'
//            '</div>'
        )
    },
    initialize : function () {

        var me = this,
            fields = [],
            schema = me.getSchema(),
            url = mobile.data.serviceUrl + 'rest/db/' + schema.name;

        Ext.each(schema.fields, function (schemaItem) {
            if (!schemaItem.header) {
                return;
            }

            fields.push({
                name : schemaItem.name,
                type : schemaItem.type
            });
        });


        this.setStore({
            fields   : fields,
            autoLoad : true,
            proxy    : {
                type        : 'ajax',
                url         : url,
                reader      : {
                    type          : 'json',
                    rootProperty  : 'record',
                    idProperty    : schema.primaryKey,
                    totalProperty : 'meta.count'
                },
                headers     : {
                    'X-Application-Name' : 'add'
                },
                extraParams : me.extraParams,
                startParam  : false,
                limitParam  : false,
                pageParam   : false
            },
            sorters  : [
                {
                    property  : 'lastName',
                    direction : 'ASC'
                },
                {
                    property  : 'firstName',
                    direction : 'ASC'
                }
            ],

            grouper : {
                groupFn      : function (record) {
                    var last_name = record.get('lastName');
                    return (last_name === null || last_name === '') ? '&nbsp' : last_name.substr(0, 1).toUpperCase();
                },
                sortProperty : 'lastName'
            },

            filters: {
                filterFn: function(record) {
//                    if (mobile.data.contactIds) {
//                        debugger;
//                    }
                    return (!mobile.data.contactIds || mobile.data.contactIds.indexOf(parseInt(''+record.data.contactId, 10)) !== -1);
                }
            }
        });

        me.callParent(arguments);
    }
});