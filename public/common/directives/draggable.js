(function () {
    MetronicApp.directive('draggable', ['$document',
        function ($document) {
            return {
                restrict: 'AC',
                link: function (scope, iElement, iAttrs) {
                    var startX = 0,
                        startY = 0,
                        x = 0,
                        y = 0;

                    var dialogWrapper = iElement.parent();
                    dialogWrapper.css({
                        position: 'relative'
                    });

                    var moves = iElement.find('.modal-header');
                    moves.css({
                        position: 'relative',
                        cursor: 'move'
                    });

                    moves.on('mousedown', function (event) {
                        // Prevent default dragging of selected content
                        event.preventDefault();
                        startX = event.pageX - x;
                        startY = event.pageY - y;
                        $document.on('mousemove', mousemove);
                        $document.on('mouseup', mouseup);
                    });

                    function mousemove(event) {
                        y = event.pageY - startY;
                        x = event.pageX - startX;
                        dialogWrapper.css({
                            top: y + 'px',
                            left: x + 'px'
                        });
                    }

                    function mouseup() {
                        $document.unbind('mousemove', mousemove);
                        $document.unbind('mouseup', mouseup);
                    }

                    //fulscreen
                    var fulscreen = iElement.find('#fulscreen');
                    fulscreen.toggle(function () {
                        dialogWrapper.parent().parent().addClass('ux-fulscreen');
                    }, function () {
                        dialogWrapper.parent().parent().removeClass('ux-fulscreen');
                    });
                }
            };
        }
    ]);
})();