/**
 * Created with JetBrains WebStorm.
 * User: mschwartz
 * Date: 2/12/13
 * Time: 6:47 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('mobile.view.Login', {
    extend     : 'Ext.form.Panel',
    xtype      : 'loginview',
    requires   : [
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.field.Password'
    ],
    config     : {
        submitOnAction : true,
        fullscreen     : true
    },
    fullscreen : true,

    initialize : function () {
        this.callParent(arguments);
        this.add([
            {
                xtype    : 'fieldset',
                defaults : {
                    labelWidth : 100
                },
                items    : [
                    {
                        xtype : 'textfield',
                        name  : 'username',
                        label : 'User Name'
                    },
                    {
                        xtype : 'passwordfield',
                        name  : 'password',
                        label : 'Password'
                    },
                    {
                        xtype : 'button',
                        ui    : 'confirm',
                        style : 'margin: 10px',
                        text  : 'Log In'
                    }
                ]
            }
        ]);
    }


});
