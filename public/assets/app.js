(() => {
const KEY='comprevolks_content_v3';
const defaults={
 brand:'COMPREVOLKS',subbrand:'COM OTÁVIO SILVA',whatsapp:'5511947858479',instagram:'@otavio.volks',email:'otavio.silva@caraiga.com.br',
 headline:'Seu próximo|Volkswagen. Sua próxima história.',intro:'Design, tecnologia e segurança para você ir mais longe.',
 heroImage:'/media/Volkswagen T-Cross no showroom Caraiga.png',
 models:[
 {name:'Tera',desc:'Design marcante para sua rotina.',image:'https://media.vw.mediaservice.avp.tech/media/fast/v3_x2TW2gcZRiG_3n-mX9EbGNs0g0xJ8JmzWmzm8nsritspUm9UawB21gVu8zO_tlsuqdOdjcpqVIPGKWI7VWobfWiFVQqgiCKohURr1QUKYoieCF4qnpRC2JVnPjdfAe-9_vei_e98KuwWoHgwdkLVyJ_quv2fYcQaw0h5BlhNVtBoW4IIea5vlz1Sjqx3NClyEB7Ne61G4mmDryEk3Qy8a0q7iwuxn2_7XQIO4QIKYR9LEzvbzVi-_ZWUGl4gVedKupCq9Q56jnZGV_PpDIFJ5MquknPcW91k9pPFzLT2il4fnpG-76fuilEfyCkV6mIjmK6Wl_0nJnFoF5rNnxhFxen3UIqKcwtGqIj2gzKpZIO8tUgv9SYxrGQH2IcYuRVRjfAh6fIzsK3cJmJFpMJpn4h8RPm25jv4O7AmsKawT2Flcc6izqH3Ycdxz4CSXr6kdvodZCfY95F3wZiAuMKKNQ4ahP7IUQKFWHoJYYuEl1GHIWPkQeY2CR1L9ZXqE7UJOogap2ufRgniQwQiROZQx7HvAPrG6yrqCdR7xL9jJHwtcFWtOAwY_sZO4o1i7uM-zDuK6TWsD4ldT5kgepCjaDuhP0MfYJawziBvIS8Ru8lzAEG30LZqF5Ulexxhv5APYJ6megBoprRLxm7HekjN5G_k-jCdDBvw9yD9QPpn0lfQ-1F3Y_9Bj2TmBLzBFac_mMMzmH9y_hOJr5HbtD3N8ZvcCPqNYY_IjqKuIGRdYznidUxfsT4C_M0iWdxh1E-SpN5AvUY9mm6OjHepHsX3WvQQ_fX7HSI7CJyBhlB9tG7DXkK-SK9VzGHMe_h5i_oX8DKYTn0P83AScZuYfx15DPIy5hDJLKYL-BmUQ9gRxm8COtMPE7mUXgPeRDLw_qHkXoouOd0rV0ORVbVtWZu4b783NyCk5-tV4qx1XKxuZSbzjrJ2JIul5aauWw6GfMqjSUv1wxaOuZ71dANud0L886e_O68k08mnZhXC_3TLNdrK7m9W6BYtV7UlUC3yyvhMHf3_HSsVKkXvErgrR7SR1b04Zau-TrnxKq66RW9ptfWwf-rzg4Znv4PMhxebrcDAAA.webp?width=864',price:'Consulte condições'},
 {name:'T-Cross',desc:'Espaço, conforto e versatilidade.',image:'https://media.vw.mediaservice.avp.tech/media/fast/v3_yWTT2hcVRTG7_vd9-6I2MbYNBOSNI3NZJo_TObNm5fECFNpWkEU2yxsrIgd7ry5Mxkz__ryZtLSFooKLWjQrEJF66IoVCqKWCoWrODS4kpLFQSXxSpdaEWsihNdne8czu_wLb5z6RfhtELB8_OXfo3_oe575keEONYUQq4JJ2qFhYYlhFjg_kpNl036xaYpxxPt1ZRuN9NREDZWVtKe682m_tdVnfLKJhUEba9LxDqgkELETnfKF5uN2Lq1FVabOtS1qaIptMrdY9r4c57JTmdKbqB1NqONWwxKwWxRP1LwfFe7pUIQuFo_1KGvCqmrVdFVnKk1StrLlsJGPWoGIlYoZf161hX2phXRlYjCSrlswnwtzC81M3gZprZgLWOdZfQiY4chgLOMvwo_wM9Mtpi6Tfo77M-wr-Jvw5nCyeKfw_8S523UBWJDxFKIEXDp20HfCPIb7KcYPIPzBGIS63eI4e9GTaA2ENsRc6hehj9i-BqJ44iTcB15mMnzTB_EuYnqZuYD1BHUSXoOYa0THyKewn4c53ucu6h1Hi6RuM3oMbCgBUfhfZx5_FP4HfE1ClQPahT1JBxi-DpqGbWK9QbyBvIe_d9iD7HzU1QM1YeqMfwb6iKJF0gYxm4w_hgyQG4g75DuwfawH8Xez_QtZn5i5h7qAOo5Zq8Qu4zsxZY4KXacZugrnH-Y6EU2kWcY_AvrDjyI-pCRJIkxxAOMnsA6T7KBdQvrT-wN0q_j70IFKMPsK6iX6OnGusL2PdBHbxe9HlSI7yF-kPhbyDhykP4tyHPId-m_i72LgQwDrzHwHvYp7E9wcjgeQ-uM72biY-QaU5exh7HfwZ8jlmDnNTgBN5l8GT5HHsFew9E4fzPa6GTrTVNvVzp5qpl6lFt8Nr9v36KXn29Ui8nVSjFaymXmPDe5ZCrlpSg3N-MmdbW5pHNR2DLJQNdMqHN7Fxe8_fm9eS_vul5S1zsPE1Ua9ZXcgU0oWWsUTTU07cpKZ5h7eiGTLFcbBV0N9eqyOb5ijrZMPTA5L1kzkS7qSLdN-N-qt012Tv8LjRn6uqgDAAA.webp?width=864',price:'Consulte condições'},
 {name:'Taos',desc:'Conforto para ir mais longe.',image:'https://media.vw.mediaservice.avp.tech/media/fast/v3_02TT2hcZRTFv_d733tTVBJjQhJrm0zaySRpMsnMy2SSUWaRNNoUraQQY0Ho9Js3X2bGvPnTlzcTTYvGlQVp0ZVW0NqNJlARVKooNoIK4j9wo90UFLpqKy6kKtaCE1dd3Xsu99xzFude-E1YdV_w1MyFP7r-tncs_IIQz9SEMD8TVlD3c1VDCDHPXaWyKuixp2u60NXTWI2pRm0sUNWVMSfuTMa2u5hTKMdct-G0ilCTIkwhQuvN8vk2EC0tdd-rKV-VR_M6Vy-0DSaXplI55eq4Sut0PDeZmHKmdCqVVq5yU67j5CbUeG4i79zZHX5ojWfKleXlDO-5FcrQc0VIddzkt5aQshtG6I1EvilQkH72bKfLdYSyK8YqWIsY5yif5PBMrhwiqGX4ArcYLjOyP2M7GX0OvIi8hPkpyTbsUaxxkmexcpivYF9nlAPoUFCDYjTvZudl5CPsut5rFmsOYw_IcTwAewB7FcR9yIShNuwOwlvEN5CZBFr8B3mEcxjTBzGuozdRupd7KPYa3QsYLxC1yzyYayb2GewLxK5DgY0RY8zdJKkR3IT6wdsgd2B3Yc9B0foExgvY97C_AvZg3WF3o_pvYp1g3Aauxu7SvgmfU0_m0SOEdEM_sTQLMPfYJ5g9EvGOpDjyIeQTQMbWANM_ErqGqlb2G8gNN0xzA2kiRVj9zo937Kvk-GrmC-y61-M36Ed-z32fk9kEHEP_Scw3iS6xcDPGP8gX0O-RXIPtoutmbyNmKajjY4fMT6CHdANh-l8EEqYXZgPYC5jnmXnO0iB3IN8BDmPdJE15DpWBsuh5wx9LQwNsO99zNOY5zGvIcOMpZHnSKbp3SL8AZyEy5gLWM8x-QK8DZcwjyJPYymsr7Fu01_B-FDcHZk-NHPwsYMH5hYSdwLnTjDeTOTrutIoNVNY1pUgs_hkdv_-RSc7U_Xy0dVSPihmEmknHi3qUqEYZNKpeFR5taLKBH5dR11V1r7KTC_OO7PZ6ayTjcedqKo0HywoVSsrmce3SdFyNa89XzdKK81h5tB8Ilrwqjnl-Wp1WT-7oo_XdcXVGSda1oHKq0A1tP__qtNuNk__B0wQFBHYAwAA.webp?width=864',price:'Consulte condições'},
 {name:'Tiguan',desc:'Tecnologia e conforto em um SUV.',image:'https://media.vw.mediaservice.avp.tech/media/fast/v3_02TXWgcZRSGv3m-b74tVRpSowmasm1cJ6npdndnN5tEWWzS1KaShighij-sk53Z2U32r5PZTVWEQDG9KEJEBVMQUcSb_oHUn3pRvRHEC0H0TgSRijcqSsWIRXGiN7065z28z-FcvOf8z8JsB4InJs9f7_1T75j_DiFOtoSQp4QZtoPFpiGEmGNnte74Xmqp5fm9Vmc16XRaqbDqt51Gyk7bo8n_--TI6GxyduKRZKnUsbtELEKFFCK2FpVPtoXYtasd1FpO4NQPut5i2-8eymcyeTebH8uMumXXSY-WS-W0mxmzx0ojY-n8-Eg5kyst5rP53RF9QUinVhNdbr7eLDt2thw0G2GrJGJBPZM7sZQVavsY0ZUIg6rve0GxHhQrrQzqGw68T8LHWMY4g_EaQ0_COvvPwLfwE8Nt5D-oK6iPMBOYBzFzmDOYRcxN9CaxAWIWsQ6k6dvDnVdRD9HfQp2j_zfMaYw_IMbwUdRT6EH0y8SKxE6z9wL6QUQR8Rx8gXwM-TQjD6Ml-gA6Mj-L8RJcQx0h_jt6A32FxCWGdsIKXETfTn4dPQML8Cr7BMYG8gZyi_iHxK9h_srecXQfuokO2NeNPoeYYfhz5CvI66R6UPejpjD3k3Mxf0DfR_4Gehbh0ZdEadQGZpI9a8Rvha8Y_hG5Tv8Wxi-whb7E3QIR457TGG8w-B6DX2P8hdpEvUVuAF1CryEeoKebni8xPoAdkOWOI7AE7yJ7kcvIs8i3UQI1gJpGPY5yUS3u-hR1CnUZ8xCmDS9wb4S8iHwT-T2pcdTr5A4R_xg9BT48j5xHV-EduIrpYH6G-TfGSYzL4pbExPHJYzPHjk7PZ24W9s0iG-XprNfoVKMM1b1GWFh4tHj48IJdnGzWXGu16oaVQmbcTlsVr-pXwsJ4Pm05tVbFKYRB27NKTt0LnMLEwpw9VZwo2sV02racRvQmYbXZWCnMbkNWvel6tcDrVFeiYeH4XMbya81FpxY4q8veMyveibbXKHkF26p7oeM6odPxgv-s9m0yWv0vAiuerZ4DAAA.webp?width=864',price:'Consulte condições'},
 {name:'Polo',desc:'Compacto, moderno e conectado.',image:'https://media.vw.mediaservice.avp.tech/media/fast/v3_x2T7WtbdRTHf_dz7_1FRFfr2qbGpotbGrvVPPQmaRoxg3XzzdRR0NVVmeHe5JeHNcnNbm_SaVUmU6qI0IFYtol7IUMmA2EgyhTnHzDFF4qKDHwhKPgI21AcoreeN-d7Hr6Hc-B7LvwqzJ4neHLuwrXwX_KWx75HiGNdIfR1Yfo9z3E1IcQ8tzbbdl2lj3RVPRzvryTtfjfddVtu2spYheQm6jc9v7ectOpOslLpWwMiFBCFLkToeOA-3QzEli09r9W1PbudqiqnVx-cdAq5WTVbU7MFO1-wHJXJ562aky9WCqpWmMlXskHVtp3CnQH7Y6HbrZYYqM603ZptZWue2_G7FRFynslml7IZYWwuIwbivtes15VXbnvlRncayyQVRVtCe4mJ80yegJcpzsFV-IWpHqmfSX-LcQnjI3JbMVOYWXKnMBfJP4A8TWiMUBKxAzKMRhndQcRC_xLjIcbWEFNo10CSSyM3EMOEFCKFDBM7R-wy4jDiWbiCfoipDfKPIgeR9yEPI1cZOoh2kvA44ST6qxgPYn6HeQO5jrxE_AsmjoFGYJN_wFF2LsK7mHPkjpB7jlyAPyf_Nua_yCHkBHI_HCR2BW0d_SaRrzDG2fYhMoSMINvEriOfR54nfoi4yVJr9Ar6BvpvpIdI34VxP8Y-zATmj8hZZm4iDyAXEUHbCIaOsU70YaLHMS8Sy7FrhKkf0NcY-xPtd7gD-R73vE48iriNiTW0t9Cuov2E9jfGGdJvkNuOdJCKwosUrjM0iPYBw7sZDo4dZfgzRizCuwm_iR5GHyNyO_op9HNEbmBs5-53MFaJLmCWMC2irzB-kp33susi-muk3seIkS5inCVXRD5BKM62y7AK3zB1gsIL8An6U5gO5j9MuIG8TqtOoGG301Ydv7TweHnv3gWrPOe2qomVZtVvlKaLVibRUM16wy8VZzIJu9Vt2CXf66lExW4rzy7tWZi39pX3lK1yJmMl7E7wM37T7SyXDmySEm23qlqe6jeXg2TpkfnpRL3lOnbLs1eW1NPL6mhPdSqqZCXayrertm_3lfd_q7VVD0b_B1ZY4W2rAwAA.webp?width=864',price:'Consulte condições'},
 {name:'Nivus',desc:'Estilo SUV com tecnologia.',image:'https://media.vw.mediaservice.avp.tech/media/fast/v3_x2T3YsbZRTG3_xm5o2I7bJ2d7Ou-xHbJM02ZjMzGzIbNYXu1huL7V7YVSsaJpM3HzbJpLNJtmWpVBR2vRBdvCj1owriRUvBD5CKgvUPqOKFoiKCF4Jg_bioBbEqzvbcnOccnuecc_GcS78Jox8Inli8dD32l7ztkR8R4mRXCO20MHr9oOJHhBDL3N5su3WVe7qr6rH4YC3rDrq5TnPQX83Zpu1kb8FswalkPW9gD4loKBKaENEzYfpsuxA7d_aDVtcN3PZcVVX69eG0p6wFz3UrtWLNWTAdx7Fc2zQd0ylW52uWZ3k1T3mmKtwZqi8LzW21xFC10PZrrj1fC_xOr-uJqNew85VTltC37xBDiV7QrNdVUG4H5UbXwrpG9n0ix4lskrxA2gcPNpndhB_gVzJ95q6R-w79Y_RPyO_CmMOYJ38Oo4zxBvJtopNEs4g9YDI-xfgetK_QDzG5gcgQuQ6SfA65F3kWMUq0hngAGSP-HvErJDZIDsNVtMfInMd4C-Nb5DDyXuSTyHVGjhLZIjZNLIv-IMb3GDeQW8hQ-yXJk2xHH07ARYxF8qfJh-CLcC1yFJlEPgRHiV8l8jLaTSa-Rp9m5iNkFDmObBP_E_kM8gKJYyQU6W-YXUbz0M6i_U5uhNxd6PehH8T4mcIvFG4iDyMfR4ScMXQNI8vUGWaWMP5j3xiZn9A2mPyHyB-k70e-yz2vkEgj7iC5TuQ8KZ_I3-ivkXuJ_G6kh1Q4z7OgMzJM5DKj-2Gc0c8Zs4ntJ3aE2OtoMbRJJnagnUN7h4kb6Lu520I_gr7O1ApGCcNm6gWmt5jdy74P0F5k7kP0OPqb5IvIY0STzFyBdTLP4TwLn6I9heES34HxL0k_9NOrqjNohh5qq06vtPJoeWlpxS4v-q1qaq1Z7TVKVtE2Uw3VrDd6pWLBTLmtbsMt9YK-SnluWwVu6cDKsn2wfKBsl03TTrmd8EF6Tb-zWjq8LUq1_apqBWrQXA2bpYeXrVS95VfcVuCuHVenVtWJvup4qmSn2qrnVt2eO1DBLaq9SwtH_w_7BbgymAMAAA.webp?width=864',price:'Consulte condições'},
 {name:'Virtus',desc:'Sedã com espaço e sofisticação.',image:'https://media.vw.mediaservice.avp.tech/media/fast/v3_x2T3WtbdRjHf-dzzvllyFzp1ja19iVsaewW89LfTpJGyGDtvFEcvXDVKTP8kpym2ZKc7PQk7azKdEonItsEKZP5AsOLjYEiiEPF-QdM8EKYMgQvBMXXiykTxZdTn5vnhc_34bn4Pld-FnbXFzw-e-VW9A-55eFvEGK1I4R5VthB1694hhBinjsaLV13M0c7bj0a762kdK-T6XhNL6OyqpDarHoNP-gup1S9kqpWe6pPREKhMIWInAzTp5uN2Lat6zc72tetdM2tdOv9U9WKVpXF7LRezOe0UnlVyLszRZ1TudzMTFZPF6raqRTc3PZQ_bEwdbMp-mr5lreo1d5F32sHnaqIVJ50nMqJrLA2jxF98cBv1OuuX2755aXONMomncY4hvECk5eYOgWnKc7C1_ATyS7pH8l8hfUh1kc4O7DT2HtxzmOXsV9HXiQySiSF2AVZhscY3sWIwvwC60FG1xFJjFsgcTLIDcQgkTqRdWSU2LvErhEPmafgOuajJDew30L2I-9FHkGuMXAI4xzRcaIpzJew7se-if078hXkVeKfM7nK1FY2owvH2X0YLmPP4hzFeRonrD8jdxH7X-QgchL5ABwidh3jLCM3MG9jjTNxFRlBDiNbxH5DPoO8RLxK3GUqZKqYG5i_kBkgcxfWfVgHsBPY35H_gfxfyIPIw4gQG8Iysc5gpxg7ycQc9j_sGSL5LeZpRm9j_Arbke8Q2UJ8DLGVyXWMN0jEML7H-BNrg8wZnJ3IKtKl8DzyOQb6MT5gcB-DqzDM4E2GFNF9RC9gRjFHGbkT8zzm21gG1k7uvoy1xtgCdglbMfYi4-fYfQ973sN8mfT7WDEyRaw3cYrIx5h5lYlrsAZfkjxF4Vn4BPMJbI39N5NeaK_X3HboYa_dcttBaeGR8tzcgirPes1aYqVRC5ZK00WVTSy5jfpSUCrmswnd7CzpUuB33URVt1xfl_YvzKsD5f1lVc5mVUK3w58JGl57uXRwU5RoeTW36bu9xnI4LD00P52oN72Kbvp65Zh7Ytk93nXbVbekEi030DUd6J7r_4-qHWa4-j_QN3rKqwMAAA.webp?width=864',price:'Consulte condições'},
 {name:'Jetta GLI',desc:'Esportividade em cada detalhe.',image:'https://assets.volkswagen.com/is/image/volkswagenag/Jetta-fullwidth_v2?Zm10PXBuZy1hbHBoYSZ3aWQ9ODAwJmJmYz1vZmYmMGFmYw%3D%3D',price:'Consulte condições'}
 ],
 offers:[
  {title:'Tera 1.0 Comfort 2026',price:'A partir de R$ 126.900,00',badge:'TAXA ZERO',text:'60% de entrada + saldo em 24 parcelas sem juros.',terms:'Financiamento sujeito à aprovação de crédito.',featured:true},
  {title:'Nivus Highline 2027',price:'A partir de R$ 137.900,00',badge:'PACOTE ADAS',text:'Taxa zero: 60% de entrada + saldo em 30 parcelas sem juros.',terms:'Consulte disponibilidade e condições da campanha.'},
  {title:'Taos Highline',price:'A partir de R$ 189.900,00',badge:'ÚLTIMAS UNIDADES',text:'60% de entrada + saldo em 36x sem juros. Bônus de até R$ 17.260,00 no seu carro na troca.',terms:'Bônus sujeito à avaliação do usado e às condições da oferta.'}
 ],
 shorts:[
  {title:'Volkswagen Tera 2027',videoId:'aIHHubqLi7s',url:'https://youtube.com/shorts/aIHHubqLi7s?si=byJq36h4BRLmD-Qp'},
  {title:'Volkswagen Tera Comfort',videoId:'HlwurZOSq_o',url:'https://youtube.com/shorts/HlwurZOSq_o?feature=share'},
  {title:'Volkswagen T-Cross',videoId:'VRIPg4qAUW8',url:'https://youtube.com/shorts/VRIPg4qAUW8?si=-4ywuA9YdWGxvSLN'},
  {title:'Volkswagen Tera - Chave presencial',videoId:'VLxCyLwQ6Eg',url:'https://youtube.com/shorts/VLxCyLwQ6Eg?si=bLKtINB0R2I5twrM'},
  {title:'Novo Volkswagen — Short',videoId:'cMlP-gsz3lw',url:'https://youtube.com/shorts/cMlP-gsz3lw'}
 ],
 contactText:'Conte o que você procura. Vou ajudar você a encontrar a melhor opção.',
 tradeText:'Avalie seu usado para estudar a possibilidade de usá-lo na troca pelo seu próximo Volkswagen.'
};
let data; try{data={...defaults,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{data={...defaults}}
const save=()=>localStorage.setItem(KEY,JSON.stringify(data));
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const wa=(msg)=>'https://wa.me/5511947858479?text='+encodeURIComponent(msg);
function render(){
 document.title=data.brand+' '+data.subbrand+' | Volkswagen';
 $('brand').textContent=data.brand;$('subbrand').textContent=data.subbrand;
 if($('heroImage')) $('heroImage').src=data.heroImage||defaults.heroImage;
 $('headline').innerHTML=esc(data.headline).split('|').join('<br><span>');
 $('headline').innerHTML+='</span>';
 $('intro').textContent=data.intro;
 // Faixa de oportunidades posicionada entre o banner principal e a vitrine de modelos.
 function arrangeOffersIntro(){
  const modelGrid=$('modelGrid');
  if(!modelGrid)return;
  const modelSection=modelGrid.closest('section')||modelGrid.closest('.section')||modelGrid.parentElement;
  if(!modelSection)return;
  let intro=document.getElementById('offersIntroPanel');
  if(!intro){
   intro=document.createElement('section');
   intro.id='offersIntroPanel';
   intro.innerHTML='<div class="offers-intro-inner"><span class="offers-intro-kicker">OPORTUNIDADES SOB CONSULTA</span><h2>Vamos encontrar a melhor condição para você.</h2><p>Consulte ofertas disponíveis, bônus na troca e opções de financiamento. Valores, versões, estoque e condições são confirmados no momento da proposta.</p><a class="offers-intro-button" href="'+wa('Olá Otávio! Quero consultar as ofertas disponíveis, bônus na troca e opções de financiamento.')+' " target="_blank" rel="noopener">Consultar ofertas →</a></div>';
   const style=document.createElement('style');
   style.id='offersIntroPanelStyles';
   style.textContent='#offersIntroPanel{padding:38px 0;background:#f4f7fa;color:#fff}#offersIntroPanel .offers-intro-inner{width:min(1360px,92%);margin:0 auto;padding:42px;border-radius:24px;background:linear-gradient(110deg,#071626,#153b5b);box-sizing:border-box}#offersIntroPanel .offers-intro-kicker{display:block;color:#79c4ff;font-size:12px;font-weight:900;letter-spacing:3px;margin-bottom:12px}#offersIntroPanel h2{font-size:clamp(25px,3vw,34px);line-height:1.2;margin:0 0 18px;color:#fff;letter-spacing:-.5px}#offersIntroPanel p{max-width:760px;font-size:17px;line-height:1.8;color:#e1ebf5;margin:0 0 20px}#offersIntroPanel .offers-intro-button{display:inline-flex;align-items:center;justify-content:center;min-height:52px;padding:0 22px;border-radius:15px;background:#078ff0;color:#fff;text-decoration:none;font-weight:800}#offersIntroPanel .offers-intro-button:hover{background:#087bd0}@media(max-width:650px){#offersIntroPanel{padding:24px 0}#offersIntroPanel .offers-intro-inner{padding:28px 22px;border-radius:18px}#offersIntroPanel .offers-intro-kicker{font-size:10px;letter-spacing:2px}#offersIntroPanel p{font-size:15px;line-height:1.65}}';
   document.head.appendChild(style);
  }
  const hero=document.querySelector('.hero');
  if(hero&&hero.parentElement&&intro.previousElementSibling!==hero)hero.insertAdjacentElement('afterend',intro);
  else if(modelSection.parentElement&&intro.parentElement!==modelSection.parentElement)modelSection.parentElement.insertBefore(intro,modelSection);
  const headings=[...modelSection.querySelectorAll('h1,h2,h3')];
  const heading=headings.find(h=>/encontre seu volkswagen/i.test(h.textContent));
  if(heading)heading.textContent='Conheça os modelos abaixo:';
 }
 arrangeOffersIntro();
 $('heroCta').href=wa('Olá Otávio! Quero conhecer as opções Volkswagen.');$('heroCta').textContent='FALAR COM OTÁVIO';
 // Miniaturas dos modelos e popup sem abrir nova janela.
 const modelGrid=$('modelGrid');
 if(modelGrid){
  modelGrid.innerHTML=(data.models||[]).map((m,i)=>'<article class="model-card"><img src="'+esc(m.image||'')+'" alt="Volkswagen '+esc(m.name)+'" loading="lazy" onerror="this.onerror=null;this.style.objectFit=\'contain\';this.src=\'/media/Volkswagen T-Cross no showroom Caraiga.png\'"><div class="model-body"><small>VOLKSWAGEN</small><h3>'+esc(m.name)+'</h3><p>'+esc(m.desc||'Conheça versões e equipamentos.')+'</p><button type="button" class="small-cta" data-model-index="'+i+'">Consultar versões →</button></div></article>').join('');
  modelGrid.querySelectorAll('[data-model-index]').forEach(b=>b.addEventListener('click',()=>openModelPopup(Number(b.dataset.modelIndex))));
 }

 $('offerGrid').innerHTML=(data.offers||[]).map(o=>{const title=String(o.title||'').toLowerCase();const poster=title.includes('tera')?'/offers/tera-comfort-2026.svg':title.includes('nivus')?'/offers/nivus-highline-2027.svg':title.includes('taos')?'/offers/taos-highline.svg':'';return '<article class="offer-card '+(o.featured?'offer-featured':'')+'">'+(poster?'<a class="offer-poster-link" href="'+poster+'" target="_blank" rel="noopener" aria-label="Abrir arte da oferta '+esc(o.title)+'"><img class="offer-poster" src="'+poster+'" alt="Oferta '+esc(o.title)+'" loading="lazy"></a>':'')+'<span>'+esc(o.badge||'OPORTUNIDADE VOLKSWAGEN')+'</span><h3>'+esc(o.title)+'</h3><strong class="offer-price">'+esc(o.price||'Consulte condições')+'</strong><p>'+esc(o.text)+'</p><small class="offer-terms">'+esc(o.terms||'Consulte disponibilidade e condições.')+'</small><a target="_blank" rel="noopener" href="'+wa('Olá Otávio! Tenho interesse na oferta '+o.title+'. '+(o.price||'')+' '+o.text)+'">Consultar pelo WhatsApp ↗</a></article>';}).join('');
 const featured=data.offers&&data.offers[0];
 const heroOffer=$('heroFeatured');
 if(heroOffer){
  const heroPanel=heroOffer.closest('.hero-photo');
  const taos=(data.models||[]).find(m=>String(m.name).toLowerCase()==='taos');
  if(heroPanel&&taos&&taos.image){heroPanel.style.setProperty('--hero-car-image','url("'+taos.image.replace(/"/g,'%22')+'")');}
  heroOffer.innerHTML='';
 }
 // Responsive layout and mobile Shorts navigation
  if(!$('comprevolksResponsiveStyles')){
   const style=document.createElement('style');style.id='comprevolksResponsiveStyles';
   style.textContent=`#modelGrid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}#modelGrid .model-card{min-width:0;overflow:hidden}#modelGrid .model-card>img{display:block;width:100%;aspect-ratio:4/3;object-fit:contain;background:#f4f7fa}#modelGrid .model-card>img[style*="visibility: hidden"]{display:none}.shorts-carousel-controls{display:none;gap:10px;justify-content:flex-end;margin:0 0 12px}.shorts-carousel-controls button{width:42px;height:42px;border:1px solid #cbd5e1;border-radius:50%;background:#fff;color:#102b45;font-size:24px;cursor:pointer}@media(max-width:760px){#modelGrid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}#shortsGrid{display:flex!important;gap:14px;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;padding-bottom:10px;-webkit-overflow-scrolling:touch}#shortsGrid .short-card{flex:0 0 88%;min-width:0;scroll-snap-align:start}.shorts-carousel-controls{display:flex}}@media(max-width:420px){#modelGrid{grid-template-columns:1fr}#shortsGrid .short-card{flex-basis:92%}}@media(min-width:761px){#shortsGrid{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}#shortsGrid .short-card{min-width:0}#shortsGrid iframe{width:100%;aspect-ratio:9/16}}`;
   document.head.appendChild(style);
  }
  const shortsGrid=$('shortsGrid');
  if(shortsGrid&&!shortsGrid.parentElement.querySelector('.shorts-carousel-controls')){
   const controls=document.createElement('div');controls.className='shorts-carousel-controls';controls.setAttribute('aria-label','Navegação dos vídeos');
   controls.innerHTML='<button type="button" aria-label="Vídeo anterior">‹</button><button type="button" aria-label="Próximo vídeo">›</button>';
   shortsGrid.parentElement.insertBefore(controls,shortsGrid);
   const arrows=controls.querySelectorAll('button');
   arrows[0].addEventListener('click',()=>shortsGrid.scrollBy({left:-shortsGrid.clientWidth*.9,behavior:'smooth'}));
   arrows[1].addEventListener('click',()=>shortsGrid.scrollBy({left:shortsGrid.clientWidth*.9,behavior:'smooth'}));
  }
  $('shortsGrid').innerHTML=(data.shorts||[]).map(v=>'<article class="short-card"><a class="short-video" href="'+esc(v.url)+'" target="_blank" rel="noopener" aria-label="Assistir '+esc(v.title)+' no YouTube"><iframe src="https://www.youtube-nocookie.com/embed/'+esc(v.videoId)+'" title="'+esc(v.title)+'" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></a><div class="short-body"><span>YOUTUBE SHORTS</span><h3>'+esc(v.title)+'</h3><a href="'+esc(v.url)+'" target="_blank" rel="noopener">Assistir no YouTube ↗</a></div></article>').join('');
 $('contactText').textContent=data.contactText;$('tradeText').textContent=data.tradeText;
  const contactSubmit=$('contactForm')?.querySelector('button[type="submit"]');
  const tradeSubmit=$('tradeForm')?.querySelector('button[type="submit"]');
  if(contactSubmit) contactSubmit.textContent='ENVIAR PROPOSTA';
  if(tradeSubmit) tradeSubmit.textContent='ENVIAR PROPOSTA';
 async function submitLead(form,kind,statusId,buttonText){
  const formEl=$(form), status=$(statusId), button=formEl.querySelector('button[type="submit"]');
  const data=new FormData(formEl);
  data.set('tipoFormulario',kind==='trade'?'avaliacao-usado':'proposta');
  if(button){button.disabled=true;button.dataset.originalText=button.textContent;button.textContent='ENVIANDO...';}
  status.textContent='Enviando sua solicitação por e-mail...';
  try{
   // Reutiliza exatamente o endpoint do formulário funcional da raiz do site.
   // FormData mantém os campos e envia as fotos reais como anexos.
   const response=await fetch('/api/contato',{method:'POST',body:data});
   const result=await response.json().catch(()=>({}));
   if(!response.ok||!result.success) throw new Error(result.error||'Não foi possível enviar agora.');
   status.textContent='Solicitação enviada com sucesso! Seus dados foram encaminhados para o atendimento.';
   formEl.reset();
  }catch(error){
   status.textContent=(error&&error.message?error.message:'Falha no envio.')+' Você também pode falar pelo WhatsApp.';
  }finally{
   if(button){button.disabled=false;button.textContent=button.dataset.originalText||buttonText;}
  }
 }
 $('contactForm').onsubmit=e=>{e.preventDefault();submitLead('contactForm','contact','contactStatus','ENVIAR SOLICITAÇÃO POR E-MAIL');};
 $('tradeForm').onsubmit=e=>{e.preventDefault();submitLead('tradeForm','trade','tradeStatus','SOLICITAR AVALIAÇÃO POR E-MAIL');};
 $('footerBrand').textContent=data.brand+' '+data.subbrand;$('footerEmail').textContent=data.email;$('footerInstagram').textContent=data.instagram;$('footerWhats').href=wa('Olá Otávio! Vim pelo site CompreVolks.');
}

/* Twin em modal CSS: abre sobre a página, sem nova aba */

const twinModalStyles=document.createElement('style');
twinModalStyles.textContent=`.twin-popup-open{display:inline-flex;align-items:center;justify-content:center;width:100%;min-height:52px;padding:15px 18px;border:0;border-radius:9px;background:#0798f5;color:#fff;font:inherit;font-size:13px;font-weight:900;cursor:pointer;box-shadow:0 8px 22px #008de533;transition:transform .18s ease,background .18s ease}.twin-popup-open:hover{background:#087fd0;transform:translateY(-1px)}.twin-modal{position:fixed;inset:0;z-index:99999;display:none;align-items:center;justify-content:center;padding:clamp(8px,2vw,24px)}.twin-modal.is-open{display:flex}.twin-modal-backdrop{position:absolute;inset:0;background:rgba(1,9,20,.84);backdrop-filter:blur(7px)}.twin-modal-dialog{position:relative;z-index:1;display:flex;flex-direction:column;width:min(1100px,100%);height:min(850px,94vh);height:min(850px,94dvh);overflow:hidden;border:1px solid #315c7e;border-radius:18px;background:#06172d;box-shadow:0 30px 100px #0009;animation:twinModalIn .2s ease-out}.twin-modal-header{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px 20px;background:#081d34;border-bottom:1px solid #25445f;color:#fff}.twin-modal-header strong{font-size:17px}.twin-modal-header p{margin:5px 0 0;font-size:12px;color:#b8cde0}.twin-modal-close{flex:0 0 42px;width:42px;height:42px;border:1px solid #42627e;border-radius:50%;background:#102d49;color:#fff;font-size:30px;line-height:1;cursor:pointer}.twin-modal-close:hover{background:#1b4569}.twin-modal-frame{flex:1;min-height:0;background:#06101d}.twin-modal-frame iframe{display:block;width:100%;height:100%;min-height:0;border:0;background:#06101d}.twin-modal-footer{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 18px;background:#081d34;border-top:1px solid #25445f;color:#a9bfd3;font-size:11px;line-height:1.45}.twin-modal-footer a{flex:0 0 auto;color:#8fd0ff;font-weight:800;text-decoration:none}body.twin-modal-open{overflow:hidden}@keyframes twinModalIn{from{opacity:0;transform:translateY(10px) scale(.99)}to{opacity:1;transform:translateY(0) scale(1)}}@media(max-width:650px){.twin-modal{padding:0}.twin-modal-dialog{width:100%;height:100%;height:100dvh;max-height:none;border-radius:0;border:0}.twin-modal-header{padding:13px 14px}.twin-modal-header strong{font-size:15px}.twin-modal-close{flex-basis:40px;width:40px;height:40px}.twin-modal-footer{align-items:flex-start;flex-direction:column;padding:10px 14px}.twin-modal-footer a{padding:5px 0}}@media(prefers-reduced-motion:reduce){.twin-modal-dialog{animation:none}.twin-popup-open{transition:none}}`;
document.head.appendChild(twinModalStyles);

const twinModal=document.createElement('div');
twinModal.className='twin-modal';
twinModal.id='twinModal';
twinModal.setAttribute('aria-hidden','true');
twinModal.innerHTML='<div class="twin-modal-backdrop" data-twin-close="1"></div><section class="twin-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="twinModalTitle"><header class="twin-modal-header"><div><strong id="twinModalTitle">Volkswagen T-Cross · Twin 3D</strong><p>Gire e explore o veículo por todos os ângulos</p></div><button type="button" class="twin-modal-close" aria-label="Fechar experiência" data-twin-close="1">×</button></header><div class="twin-modal-frame"><iframe id="vehicleTwinPopupFrame" title="Twin interativo Volkswagen T-Cross" src="about:blank" data-src="https://comprevolks-tcross-twin-preview-5ic2dje0d.vercel.app/" allow="fullscreen; autoplay; xr-spatial-tracking" allowfullscreen></iframe></div><footer class="twin-modal-footer"><span>Se a experiência não carregar aqui, pode haver uma restrição no servidor do Twin.</span><a href="https://comprevolks-tcross-twin-preview-5ic2dje0d.vercel.app/" target="_blank" rel="noopener">Abrir diretamente ↗</a></footer></section>';
document.body.appendChild(twinModal);
function openTwinModal(){const frame=$('vehicleTwinPopupFrame');if(frame&&frame.src==='about:blank')frame.src=frame.dataset.src;twinModal.classList.add('is-open');twinModal.setAttribute('aria-hidden','false');document.body.classList.add('twin-modal-open');const close=twinModal.querySelector('.twin-modal-close');if(close)close.focus();}
function closeTwinModal(){twinModal.classList.remove('is-open');twinModal.setAttribute('aria-hidden','true');document.body.classList.remove('twin-modal-open');const frame=$('vehicleTwinPopupFrame');if(frame)frame.src='about:blank';}
document.addEventListener('click',e=>{if(e.target.closest('#twinOpenPopup'))openTwinModal();if(e.target.closest('[data-twin-close]'))closeTwinModal();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&twinModal.classList.contains('is-open'))closeTwinModal();});

render();
const modelPopupStyle=document.createElement('style');modelPopupStyle.textContent='.model-popup{position:fixed;inset:0;z-index:100001;display:none;align-items:center;justify-content:center;padding:20px}.model-popup.open{display:flex}.model-popup-bg{position:absolute;inset:0;background:#020b16d9;backdrop-filter:blur(5px)}.model-popup-panel{position:relative;display:grid;grid-template-columns:1fr 1fr;width:min(900px,100%);max-height:90vh;overflow:auto;border-radius:18px;background:#fff;color:#0b2037;box-shadow:0 25px 90px #0008}.model-popup-photo{width:100%;height:100%;min-height:330px;object-fit:contain;background:#edf5fb}.model-popup-content{padding:30px;display:flex;flex-direction:column;gap:14px}.model-popup-content h2{font-size:32px;margin:0}.model-popup-content p{color:#617185;line-height:1.7}.model-popup-close{position:absolute;top:12px;right:12px;width:42px;height:42px;border:0;border-radius:50%;background:#fff;color:#102b45;font-size:28px;cursor:pointer}.model-popup-wa{display:block;text-align:center;background:#10bd70;color:white;text-decoration:none;border-radius:8px;padding:14px;font-weight:900;margin-top:auto}@media(max-width:650px){.model-popup{padding:0}.model-popup-panel{grid-template-columns:1fr;width:100%;height:100%;max-height:100dvh;border-radius:0}.model-popup-photo{height:34vh;min-height:220px}.model-popup-content{padding:22px}}';document.head.appendChild(modelPopupStyle);
const modelPopup=document.createElement('div');modelPopup.className='model-popup';modelPopup.id='modelPopup';modelPopup.innerHTML='<div class="model-popup-bg" data-model-close></div><section class="model-popup-panel" role="dialog" aria-modal="true" aria-labelledby="modelPopupTitle"><button class="model-popup-close" type="button" aria-label="Fechar" data-model-close>×</button><img class="model-popup-photo" id="modelPopupPhoto" alt=""><div class="model-popup-content"><small>LINHA VOLKSWAGEN</small><h2 id="modelPopupTitle"></h2><p id="modelPopupDesc"></p><p>Consulte versões, equipamentos, disponibilidade e condições personalizadas.</p><a id="modelPopupWa" class="model-popup-wa" href="#" target="_blank" rel="noopener">Consultar pelo WhatsApp ↗</a></div></section>';document.body.appendChild(modelPopup);
function openModelPopup(i){const m=(data.models||[])[i];if(!m)return;$('modelPopupPhoto').src=m.image||'';$('modelPopupPhoto').alt='Volkswagen '+m.name;$('modelPopupTitle').textContent=m.name;$('modelPopupDesc').textContent=m.desc||'Conheça este modelo Volkswagen.';$('modelPopupWa').href=wa('Olá Otávio! Quero conhecer as versões e condições do Volkswagen '+m.name+'.');modelPopup.classList.add('open');modelPopup.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';}
function closeModelPopup(){modelPopup.classList.remove('open');modelPopup.setAttribute('aria-hidden','true');document.body.style.overflow='';}
modelPopup.addEventListener('click',e=>{if(e.target.closest('[data-model-close]'))closeModelPopup();});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modelPopup.classList.contains('open'))closeModelPopup();});

})();
