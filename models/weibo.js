module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'weibo',
        {
            'uid': {
                'type': DataTypes.INTEGER,
                'allowNull': false
            },
            'home': {
                'type': DataTypes.STRING(125),
                'allowNull': false
            },
            'name': {
                'type': DataTypes.STRING(125),
                'allowNull': true
            },
            'emotion': {
                'type': DataTypes.DOUBLE,
                'allowNull': true
            },
            'title': {
                'type': DataTypes.TEXT,
                'allowNull': true
            },
            'description': {
                'type': DataTypes.TEXT,
                'allowNull': true
            },
            'pubDate': {
                'type': DataTypes.STRING(125),
                'allowNull': true
            },
            'link': {
                'type': DataTypes.STRING(125),
                'allowNull': true
            }
        }
    );
}