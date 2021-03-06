
<div class="grid">
    <?php $c = time(); ?>

    <div class="col span-6">
        <p style="margin-top: 0">Loads background images.</p>

        <?php for ($x = 0; $x <= 10; $x++) { ?>

            <div class="lazy-load example-lazy-load" style="background-image: url('http://lorempixel.com/200/200/?c=<?php echo $c; ?>')">
                <!-- Background styles are lazy loaded via CSS -->
            </div>

        <?php $c++; } ?>
    </div>

    <div class="col span-6">
        <p style="margin-top: 0">Loads inline images.</p>

        <?php for ($x = 0; $x <= 10; $x++) { ?>

            <div class="lazy-load example-lazy-load">
                <img data-lazyload="http://lorempixel.com/200/200/?c=<?php echo $c; ?>">
            </div>

        <?php $c++; } ?>
    </div>

    <span class="clear"></span>
</div>

<script>
    <?php if ($vendor === 'mootools') { ?>
        $$('.lazy-load').lazyLoad({
            forceLoad: <?php bool('forceLoad', false); ?>,
            delay: <?php number('delay', 10000); ?>,
            threshold: <?php number('threshold', 150); ?>
        });
    <?php } else { ?>
        $('.lazy-load').lazyLoad({
            forceLoad: <?php bool('forceLoad', false); ?>,
            delay: <?php number('delay', 10000); ?>,
            threshold: <?php number('threshold', 150); ?>
        });
    <?php } ?>
</script>