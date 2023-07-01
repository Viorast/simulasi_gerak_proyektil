$('#parameter-button').click(item => {
    let $self = $(item.target);
    let $container = $self.parent();
    let show = $container.attr('show') === 'false';  // toggle boolen
    $container.attr('show', show); // Membuka, Menutup Kotak Input
});

// Memperbarui Nilai Input
$('#height,#velocity,#degree,#mass,#gravity').on('input', event => { // Mengatur Nilai Input
    let self = event.target;
    let regex = new RegExp(self.getAttribute('pattern'));
    // Menampilkan Kesalahan Input Angka
    if (!self.value.match(regex)) return;
    let type = self.getAttribute('type');
    // Memperbarui Tampilan Angka secara Dinamis
    if (type === 'range')
        $(self).parent().find('.value').text(parseFloat(self.value));
    setValue();
});

// Mengubah Gambaran Gambar
$('input:radio[name=draw]').change(event => {
    let self = event.target;
    interface = self.value;
    if (self.value === 'degreeWithDistence') // Menghitung sudut
        calculateDegree();
})

// Mengubah sudut
$('.set-value').click(event => {
    let self = event.target;
    let degree = $(self).find(':text').val();
    if (isNaN(parseFloat(degree))) return;
    $('#degree').val(degree);
    $('#degree').parent().find('.value').text(degree);
    setValue();
})

// Memulai Perhitungan Jalur
$('#start').click(() => balls.forEach(ball => ball.start()));