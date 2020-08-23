import React from 'react';
import Dugme from '../components/Dugme';

const MyFormPage = () => {
    return (
        <div className="container">
            My Form page
            <nav className="contianer">
                <div className="navbar-brand">
                    Ayarlar
                </div>
            </nav>
            <div className="panel panel-default text-center">
                <div className="panel-body">
                    A basic panel

                    <div className="col-sm-12 col-md-12 pt-10" >
                        <div className="row text-align-center">
                            <Dugme backgroundColor="orange" icon="print" text="Çıktı Listesi"></Dugme>
                            <Dugme backgroundColor="orange" icon="input" text="Dışarıdan Aktarma"></Dugme>
                            <Dugme backgroundColor="orange" icon="monetization_on" text="Döviz Kuru Listesi"></Dugme>
                            <Dugme backgroundColor="orange" icon="account_balance" text="Döviz Listesi"></Dugme>
                            <Dugme backgroundColor="orange" icon="people_outline" text="Kullanıcı Grup Listesi"></Dugme>
                            <Dugme backgroundColor="orange" icon="people_alt" text="Plasiyer Listesi"></Dugme>
                            <Dugme backgroundColor="orange" icon="print" text="Proje Listesi"></Dugme>
                            <Dugme backgroundColor="orange" icon="web" text="Şablon Listesi"></Dugme>
                            <Dugme backgroundColor="orange" icon="apartment" text="Şirket Listesi"></Dugme>
                            <Dugme backgroundColor="orange" icon="business" text="Şube Listesi"></Dugme>
                            <Dugme backgroundColor="orange" icon="domain_disabled" text="Vergi Dairesi Listesi"></Dugme>
                            <Dugme backgroundColor="orange" icon="vpn_key" width="4" height="4" text="Yetki Alt Listesi"></Dugme>
                            <Dugme backgroundColor="orange" icon="vpn_key" text="Yetki Listesi"></Dugme>
                        </div>
                        <div className="row text-align-center">
                            <Dugme backgroundColor="orange" icon="report" text="Rapor Yetkileri Listesi"></Dugme>
                            <Dugme backgroundColor="orange" icon="credit_card" text="SanalPOS Linkleri"></Dugme>
                            <Dugme backgroundColor="orange" icon="today" text="Takvim Listesi"></Dugme>

                        </div>
                    </div>
                </div>

            </div>


        </div >
    );
};

export default MyFormPage;