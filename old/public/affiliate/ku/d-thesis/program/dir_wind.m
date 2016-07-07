clear
% フォルダまるごと複素ステレオ変換('*.wav'→'*.wave')
sndpath='C:\sound\';
snd=dir([sndpath '*.wav']);
if(isempty(snd))
    'No wave files.'
end
for i=1:length(snd)
    snd(i).name
    if(length(dir([sndpath snd(i).name 'e']))==1)
        'transformed file is exsist.'
        continue;
    end
    s=importdata([sndpath snd(i).name]);
    len=length(s.data);
    comps=ifft(fft(s.data(:,1)).*[1 2*ones(1,ceil(len/2)-1) ones(1,mod(len+1,2)) zeros(1,ceil(len/2)-1)]');
    % plot(comps);
    s2=[real(comps) imag(comps)];
    % sound(s2,s.fs)
    wavwrite(s2,s.fs, [sndpath snd(i).name 'e']);
end
