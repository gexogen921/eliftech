<!DOCTYPE html>
<html ng-app="app">
    <head>
        <meta charset="utf-8">

        <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.css">
        <link rel="stylesheet" href="styles/styles.css">

        <script src="assets/angular/angular.js"></script>

        <script src="javascript/app.js"></script>

        <title>Eliftech</title>
    </head>
    <body ng-controller="main">
        <div class="container">
            <h3 class="text-center">Add company</h3>
            <hr>
            <div class="media-list">
                <div class="media">
                    <div class="media-left">
                        <img class="img-rounded media-object" src="http://placehold.it/128x128?text=LOGO" style="width: 128px; height: 128px;" alt="">
                    </div>
                    <div class="media-body">
                        <input type="text" class="form-control" placeholder="Name" ng-model="newCompany.name">
                        <hr>
                        <div class="content">
                            <div class="inputs">
                                <select class="form-control" title="Parent" ng-options="(company.depth + ' ' + company.name) for company in companiesList" ng-model="newCompany.parent">
                                    <option value="">Root</option>
                                </select>
                                <div class="input-group" style="margin-top: 5px;">
                                    <span class="input-group-addon">$</span>
                                    <input type="text" class="form-control" placeholder="Earnings" ng-model="newCompany.earnings">
                                </div>
                            </div>
                            <div class="buttons">
                                <button class="btn btn-success btn-block" ng-click="addCompany()" ng-disabled="!newCompany.name || !newCompany.earnings"><span class="glyphicon glyphicon-plus"></span></button>
                                <button class="btn btn-warning btn-block" ng-click="redrawCompanies()"><span class="glyphicon glyphicon-refresh"></span></button>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div ng-show="companiesTree.length">
                <hr>
                <h3 class="text-center">Tree companies</h3>
                <hr>
                <div class="media-list">
                    <div class="media" ng-repeat="company in companiesTree" ng-include="'companies.html'"></div>
                </div>
            </div>
        </div>

        <script id="companies.html" type="text/ng-template">
            <div class="media-left">
                <img class="img-rounded media-object" src="http://placehold.it/128x128?text=LOGO" style="width: 128px; height: 128px;" alt="">
            </div>
            <div class="media-body">
                <input type="text" class="form-control" placeholder="Name" ng-model="company.name">
                <hr>
                <div class="content">
                    <div class="inputs">
                        <input type="text" class="form-control" placeholder="Total" ng-value="company.total | currency" ng-disabled="true">
                        <div class="input-group" style="margin-top: 5px;">
                            <span class="input-group-addon">$</span>
                            <input type="text" class="form-control" placeholder="Earnings" ng-model="company.earnings">
                        </div>
                    </div>
                    <div class="buttons">
                        <button class="btn btn-success btn-block" ng-click="saveCompany(company)" ng-disabled="!company.name || !company.earnings"><span class="glyphicon glyphicon-floppy-disk"></span></button>
                        <button class="btn btn-danger btn-block" ng-click="removeCompany(company)"><span class="glyphicon glyphicon-trash"></span></button>
                    </div>
                    <div class="clearfix"></div>
                </div>

                <div class="media" ng-repeat="company in company.children" ng-include="'companies.html'"></div>
            </div>
        </script>
    </body>
</html>
